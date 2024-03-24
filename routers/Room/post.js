const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(require("../../config/cors"));

const Room = require("./../../models/Room")();

router.post(
  "/newRoom",
  bodyParser.json({ limit: "20mb" }),
  async (req, res) => {
    try {
      const body = req.body;
      await Room.insertMany(body);
      res.status(200).json({ message: "ok", process: true });
    } catch (error) {
      console.error(error);
      res.json({ process: false, error });
    }
  }
);

module.exports = router;
