// /middleware/authorize.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const Bearertoken = req.header("Authorization")?.split(" ")[1];

  let token = req.cookies.jwt;
  if (token || Bearertoken) {
    try {
      if (Bearertoken) {
        token = Bearertoken;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(410).json({ error: err.message });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
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

/*const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = authorize;*/
