const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: { type: String },
  memberId: { type: String },
  room_id: { type: String },
  session_id: { type: String },
  status: { type: String },
  order_id: { type: String },
  guestInfo: [
    {
      firstname: { type: String },
      lastname: { type: String },
      phoneNumber: { type: String },
    },
  ],
  guestNote: { type: String },
  adminNote: { type: String },
  bookedDate: { type: [String] },
  price: { type: Number },
  createdAt: { type: Date },
});

const Order = (collectionName = "Order") =>
  mongoose.model(collectionName, OrderSchema);

module.exports = Order;
