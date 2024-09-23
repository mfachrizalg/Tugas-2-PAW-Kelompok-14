const express = require("express");
const router = express.Router();
const {
    getProgress,
    addProgress,
    updateProgress
} = require("../controllers/progressController");

router.route('/')
    .post(addProgress)

router.route('/:id')
    .patch(updateProgress)
    .get(getProgress)

module.exports = router;