const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.post(
  "/uploadImage",
  bodyParser.json({ limit: "10mb" }),
  async (req, res) => {
    try {
      const Image = require("./models/Image");
      const insImage = Image();
      await insImage.insertMany(
        req.body.images.map((item) => ({ images: item }))
      );
      res.json({ message: "ok" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
);

module.exports = router;
