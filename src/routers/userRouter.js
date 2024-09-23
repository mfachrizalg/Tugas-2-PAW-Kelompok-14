// /routes/userRoutes.js
const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authorize");

const router = express.Router();

// Rute ini bisa diakses oleh user dan admin
router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("user", "admin"),
  (req, res) => {
    if (req.user.role === "admin") {
      res.status(200).json({ message: `Welcome Admin ${req.user.username}` });
    } else {
      res.status(200).json({ message: `Welcome User ${req.user.username}` });
    }
  }
);

// Rute Bookmark Buku (User) dengan parameter id buku
router.post(
  "/bookmark/:id",
  authenticateToken,
  authorizeRoles("user"),
  (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Bookmark buku dengan id ${id}` });
  }
);

module.exports = router;
