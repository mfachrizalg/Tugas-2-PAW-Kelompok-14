// /routes/userRoutes.js
const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authorize");

const router = express.Router();

// Rute ini bisa diakses oleh user dan admin
router.get("/dashboard", authenticateToken, (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ message: "Welcome Admin" });
  } else {
    res.status(200).json({ message: "Welcome User" });
  }
});

// Rute ini bisa diakses oleh admin
router.get(
  "/admin-data",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({ message: "This is admin data" });
  }
);
module.exports = router;
