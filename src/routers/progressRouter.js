const express = require("express");
const router = express.Router();
const {
    getAllProgress,
    addProgress,
    deleteProgress
} = require("../controllers/progressController");
const {
    authenticateToken,
    authorizeRoles
} = require("../middlewares/authorize");

router.route('/')
    .get(authenticateToken,getAllProgress)

router.route('/:bookId')
    .post(authenticateToken,addProgress)
    .delete(authenticateToken, deleteProgress);

module.exports = router;