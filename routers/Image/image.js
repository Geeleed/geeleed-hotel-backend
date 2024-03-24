const express = require("express");
const router = express.Router();

router.use(require("../../config/cors"));
const GET = require("./get");
const POST = require("./post");
const DELETE = require("./delete");

router.use("/", GET);
router.use("/", POST);
router.use("/", DELETE);

module.exports = router;
