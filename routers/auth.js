const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const generateToken = require("../function/generateToken");
router.use(require("./../config/cors"));

router.get("/auth", authenticateToken, (req, res) => {
  try {
    // console.log("User Info : ", req.user);
    const nextpath = req.headers.nextpath.split("/");
    const role = req.user.role;
    if (
      nextpath[1] === "lobby" &&
      nextpath[2] === "admin" &&
      role.includes("admin")
    )
      return res.json({ process: true, data: req.user });

    if (
      nextpath[1] === "lobby" &&
      nextpath[2] !== "admin" &&
      role.includes("user")
    )
      return res.json({ process: true, data: req.user });
    res.json({ process: false, data: req.user });
  } catch (error) {
    console.error(error);
    res.json({ process: false, data: req.user });
  }
});

router.get("/stayIn", authenticateToken, (req, res) => {
  try {
    const token = generateToken({ email: req.user.email, role: req.user.role });
    res.json({ process: true, data: req.user, token });
  } catch (error) {
    console.error(error);
    res.json({ process: false, data: req.user });
  }
});

module.exports = router;
