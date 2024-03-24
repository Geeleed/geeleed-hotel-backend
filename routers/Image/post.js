const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(require("../../config/cors"));

const Image = require("./../../models/Image")();
router.post(
  "/uploadImage",
  bodyParser.json({ limit: "10mb" }),
  async (req, res) => {
    try {
      await Image.insertMany(req.body.images.map((item) => ({ images: item })));
      res.json({ message: "ok" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
);

module.exports = router;
