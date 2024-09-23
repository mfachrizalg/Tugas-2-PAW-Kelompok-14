const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authorize");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

// Rute ini hanya bisa diakses oleh admin
router.get(
  "/admin-data",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "This is admin data",
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    });
  }
);

router.get(
  "/userList",
  authenticateToken,
  authorizeRoles("admin"),
  getAllUsers
);
module.exports = router;
