const {
    getFeedbackbyBook,
    addFeedback,
    updateFeedback
} = require('../controllers/feedbackController');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(getFeedbackbyBook)
    .post(addFeedback)

router.route('/:id')
    .patch(updateFeedback)

module.exports = router;