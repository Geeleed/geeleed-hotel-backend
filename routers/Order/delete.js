const express = require("express");
const router = express.Router();
const Order = require("./../../models/Order")();
router.use(require("../../config/cors"));
router.delete("/deleteSessionByOrderId/:id", async (req, res) => {
  try {
    await Order.deleteOne({ order_id: req.params.id });
    res.json({ message: "deleted", process: true });
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

router.delete("/clearExpireSession", async (req, res) => {
  try {
    const stripe = require("stripe")(process.env.SK_STRIPE);

    const sessions = await stripe.checkout.sessions.list({ status: "expired" });
    const sessionIds = sessions.data.map((session) => session.id);
    await Order.deleteMany({ session_id: { $in: sessionIds } });

    res.json({
      message: "ลบ session ที่หมดอายุออกจากฐานข้อมูลแล้ว",
      process: true,
    });
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});
router.delete("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    await Order.deleteOne({ order_id: orderId });
    res.json({ message: "ลบข้อมูลเรียบร้อย" });
  } catch (error) {
    console.log("error", error);
    res
      .status(404)
      .json({
        error: error.errorMessage || "System error",
        message: "เกิดข้อขัดข้อง",
      });
  }
});

module.exports = router;
