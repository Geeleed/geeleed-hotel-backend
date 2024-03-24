const express = require("express");
const router = express.Router();
router.use(require("../../config/cors"));

const POST = require("./post");

router.use("/", POST);

module.exports = router;
