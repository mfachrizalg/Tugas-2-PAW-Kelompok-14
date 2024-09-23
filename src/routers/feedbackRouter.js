const {
    getFeedbackbyBook,
    addFeedback,
    updateFeedback,
    deleteFeedbackById
} = require('../controllers/feedbackController');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(getFeedbackbyBook)
    .post(addFeedback)

router.route('/:id')
    .patch(updateFeedback)
    .delete(deleteFeedbackById);

module.exports = router;