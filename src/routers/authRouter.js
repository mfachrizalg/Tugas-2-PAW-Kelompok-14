// /routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authorize");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/", authController.checkCookie);
router.delete("/deleteAccount", authenticateToken, authController.deleteAccount);

module.exports = router;
