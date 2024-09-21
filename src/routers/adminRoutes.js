const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authorize");

const router = express.Router();

// Rute ini hanya bisa diakses oleh admin
router.get(
  "/admin-data",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({ message: "This is admin data" });
  }
);

module.exports = router;
