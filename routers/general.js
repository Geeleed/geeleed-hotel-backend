const express = require("express");
const router = express.Router();
router.use(require("./../config/cors"));

router.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports = router;
