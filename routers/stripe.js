const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const authenticateToken = require("../middleware/authenticateToken");
router.use(require("./../config/cors"));

const stripe = require("stripe")(process.env.SK_STRIPE);

const Order = require("./../models/Order")();
const Member = require("./../models/Member")();

router.get("/getSessionIdByOrder_id/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});
router.get("/checkoutStatus/:sessionId", async (req, res) => {
  try {
    const checkoutStatus = await stripe.checkout.sessions.retrieve(
      req.params.sessionId
    );
    res.json(checkoutStatus);
  } catch (error) {
    console.error("Error in checkoutStatus : ", error);
    res.json(error);
  }
});
router.delete("/removeSession/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  try {
    const checkoutStatus = await stripe.checkout.sessions.retrieve(sessionId);
    if (checkoutStatus["payment_status"] === "unpaid") {
      await Order.deleteOne({ session_id: sessionId });
      console.log("ลบ session ที่ไม่จ่ายเงินแล้ว " + sessionId);
    }
    res.json(checkoutStatus);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post(
  "/checkout",
  authenticateToken,
  bodyParser.json(),
  async (req, res) => {
    const { guestInfo, guestNote, price, markDate, room_id } = req.body;
    try {
      const checkRoom = await Order.find({ room_id });
      const checkBookedDate =
        checkRoom.length > 0
          ? checkRoom.flatMap((item) => item["bookedDate"])
          : [];

      const email = req.user.email;
      const memberId = await Member.findOne({ email: email }).then(
        (r) => r._id
      );
      const orderId = uuidv4();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "thb",
              product_data: {
                name: email,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_ORIGIN}/lobby/payment/${orderId}`,
        cancel_url: `${process.env.FRONTEND_ORIGIN}/lobby/payment/${orderId}`,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // seconds
      });
      if (markDate.some((item) => checkBookedDate.includes(item))) {
        return res.json({
          message: "วันที่ท่านจองเพิ่งถูกจองไป โปรดเลือกใหม่",
          sessionId: session.id,
          process: false,
        });
      }

      const data = {
        email,
        memberId,
        room_id,
        session_id: session.id,
        status: session.status,
        order_id: orderId,
        guestInfo,
        guestNote,
        bookedDate: markDate,
        price,
      };

      await Order.insertMany(data);

      res.json({
        message: "Checkout success.",
        sessionId: session.id,
        process: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({
        error: "Error payment",
        message: "เกิดข้อผิดพลาด",
        process: false,
      });
    }
  }
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.EP_STRIPE;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        // case "payment_intent.succeeded":
        const paymentSuccessData = event.data.object;
        const sessionId = paymentSuccessData.id;
        const data = {
          status: paymentSuccessData.status,
        };
        await Order.updateOne({ session_id: sessionId }, { $set: data });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
);

module.exports = router;
