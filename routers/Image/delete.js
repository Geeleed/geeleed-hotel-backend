const express = require("express");
const router = express.Router();
router.use(require("../../config/cors"));

const Image = require("./../../models/Image")();
router.delete("/deleteImage/:id", async (req, res) => {
  try {
    let imageId = new mongoose.Types.ObjectId(req.params.id);
    if (!imageId || !mongoose.Types.ObjectId.isValid(imageId))
      throw "invalid id";
    const result = await Image.findByIdAndDelete(imageId);
    res.json({ message: "deleted" });
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

module.exports = router;
