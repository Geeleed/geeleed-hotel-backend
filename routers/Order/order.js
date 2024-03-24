const express = require("express");
const router = express.Router();

router.use(require("../../config/cors"));

const GET = require("./get");
const DELETE = require("./delete");

router.use("/", GET);
router.use("/", DELETE);

module.exports = router;
