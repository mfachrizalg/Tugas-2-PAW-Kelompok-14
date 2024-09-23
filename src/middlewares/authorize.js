// /middleware/authorize.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: "Unauthorized!" });
    }
  } else {
    return res.status(401).json({ message: "Log in First!" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          `You're ${req.user.role}. You do not have access to this resource`,
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
