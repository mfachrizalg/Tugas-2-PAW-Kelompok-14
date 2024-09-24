const express = require("express");
const router = express.Router();
const {
    getAllProgress,
    addProgress
} = require("../controllers/progressController");
const {
    authenticateToken,
    authorizeRoles
} = require("../middlewares/authorize");

router.route('/')
    .get(authenticateToken,getAllProgress)

router.route('/:bookId')
    .post(authenticateToken,addProgress)

module.exports = router;