const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.use(require("../../config/cors"));

const Order = require("./../../models/Order")();

router.get("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await Order.findOne({ order_id: orderId });
    const selectedOrder = result;
    if (!selectedOrder) {
      throw {
        errorMessage: "Order not found",
      };
    }
    res.json(selectedOrder);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: error.errorMessage || "System error" });
  }
});

router.get("/getOrderByEmail", async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const secretKey = process.env.SECRET_KEY;
    const user = jwt.verify(token, secretKey);
    const order = await Order.find({ email: user.email });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});
router.get("/loadOrderByRoom_id/:_id", async (req, res) => {
  try {
    try {
      const data = await Order.find({ room_id: req.params._id });
      // console.log("loadOrderByRoom_id", data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
