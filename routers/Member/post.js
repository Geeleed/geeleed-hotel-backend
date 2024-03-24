const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const generateToken = require("./../../function/generateToken");

const Member = require("./../../models/Member")();
router.post("/signup", bodyParser.json(), async (req, res) => {
  try {
    let body = req.body;
    if (await Member.findOne({ email: body.email })) {
      return res.json({ message: "บัญชีนี้ถูกใช้แล้ว", process: false });
    }
    const hashedPassword = bcrypt.hashSync(
      body.password,
      Number(process.env.SALT)
    );
    const hashedAnswer = bcrypt.hashSync(body.answer, Number(process.env.SALT));
    body.password = hashedPassword;
    body.answer = hashedAnswer;
    await Member.insertMany(body);
    res.status(200).json({ message: "สมัครใช้งานสำเร็จ", process: true });
  } catch (error) {
    console.error(error);
    res.json({ process: false, error });
  }
});

router.post("/signin", bodyParser.json(), async (req, res) => {
  try {
    let body = req.body;
    const user = await Member.findOne({ email: body.email });
    const accept = bcrypt.compareSync(body.password, user.password);
    if (!accept)
      return res.json({ message: "รหัสผ่านไม่ถูกต้อง", process: false });
    const token = generateToken({ email: body.email, role: user.role });
    res.status(200).json({ message: "ok", process: true, token });
  } catch (error) {
    console.error(error);
    res.json({
      process: false,
      error,
      message: "ไม่มีข้อมูลในระบบ กรุณาสมัครสมาชิก",
    });
  }
});

router.post("/forgot", bodyParser.json(), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Member.findOne({ email });
    res
      .status(200)
      .json({ message: "ok", process: true, question: user.question });
  } catch (error) {
    console.error(error);
    res.json({ process: false, error });
  }
});

router.post("/reset", bodyParser.json(), async (req, res) => {
  try {
    let body = req.body;
    const user = await Member.findOne({ email: body.email });
    const accept = bcrypt.compareSync(body.answer, user.answer);
    if (body.newPassword === body.confirmPassword && accept) {
      const hashedPassword = bcrypt.hashSync(
        body.newPassword,
        Number(process.env.SALT)
      );
      await Member.updateOne(
        { email: body.email },
        { $set: { password: hashedPassword } }
      );
      const token = generateToken({ email: body.email, role: user.role });
      res
        .status(200)
        .json({ message: "เปลี่ยนรหัสผ่านสำเร็จ", process: true, token });
    } else {
      res.json({ message: "ข้อมูลไม่ถูกต้อง โปรดลองอีกครั้ง", process: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ process: false, error });
  }
});

module.exports = router;
