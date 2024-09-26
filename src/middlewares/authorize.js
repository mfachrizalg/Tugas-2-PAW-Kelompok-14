const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // Ambil token baik dari cookie atau Authorization header
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Log in First!" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan payload dari token ke req.user
    next();
  } catch (err) {
    // Periksa jenis error dan kirim pesan yang lebih detail
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again!" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, please log in again!" });
    }
    res.status(403).json({ message: "Unauthorized!" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `You're ${req.user.role}. You do not have access to this resource`,
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
