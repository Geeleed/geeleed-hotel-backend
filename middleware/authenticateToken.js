const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden", process: false });
      }
      req.user = decoded; // เก็บข้อมูลผู้ใช้ใน req.user
      next();
    });
  } catch (error) {
    console.error(error);
    res.json({ process: false, error });
  }
}

module.exports = authenticateToken;
