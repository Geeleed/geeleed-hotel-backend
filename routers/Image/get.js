const express = require("express");
const router = express.Router();
router.use(require("../../config/cors"));

const Image = require("./../../models/Image")();
router.get("/loadImage", async (req, res) => {
  try {
    const data = await Image.find();
    res.json({ message: "ok", data });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
