const express = require("express");
const router = express.Router();
router.use(require("../../config/cors"));

const Room = require("../../models/Room")();

router.get("/hotelRoom", (req, res) => {
  try {
    const hotelRoom = require("./../../mock-json/hotelRoom.json");
    res.json(hotelRoom);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.get("/loadRoom", async (req, res) => {
  try {
    const data = await Room.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.get("/loadRoomBy_id/:_id", async (req, res) => {
  try {
    const data = await Room.findOne({ _id: req.params._id });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
