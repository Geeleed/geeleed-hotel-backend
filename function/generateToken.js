const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // กำหนดเวลาหมดอายุของ token
  return token;
}

module.exports = generateToken;
