const express = require("express");
const router = express.Router();
router.use(require("../../config/cors"));

const Room = require("./../../models/Room")();
router.delete("/deleteRoomCard/:id", async (req, res) => {
  try {
    let roomCardId = new mongoose.Types.ObjectId(req.params.id);
    if (!roomCardId || !mongoose.Types.ObjectId.isValid(roomCardId))
      throw "invalid id";
    const result = await Room.findByIdAndDelete(roomCardId);
    res.json({ message: "deleted" });
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

module.exports = router;
