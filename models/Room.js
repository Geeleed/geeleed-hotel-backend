const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomId: { type: String, unique: true, required: true },
  imageId: { type: [String], required: true },
  roomName: { type: String, default: "ไม่ได้ตั้งชื่อ" },
  roomType: { type: String, default: "ห้องสแตนดาร์ด" },
  roomSize: { type: Number, default: 25 },
  guestLimit: { type: Number, default: 1 },
  canCancel: { type: Boolean, default: false },
  canCancelPrice: { type: Number, default: 0 },
  pricePerDay: { type: Number, default: 0 },
  breakfast: { type: Boolean, default: false },
  breakfastPrice: { type: Number, default: 0 },
  freeParking: { type: Boolean, default: false },
  freeInternet: { type: Boolean, default: false },
  description: { type: String, default: "" },
  createAt: { type: Date },
  updateAt: { type: Date },
  booked: [
    {
      email: { type: String },
      memberId: { type: String },
      guest: [
        {
          firstname: { type: String },
          lastname: { type: String },
          phoneNumber: { type: String },
        },
      ],
      bookedDate: { type: [String] },
    },
  ],
  ready: { type: Boolean, default: true },
});

const Room = (collectionName = "Room") =>
  mongoose.model(collectionName, RoomSchema);

module.exports = Room;
