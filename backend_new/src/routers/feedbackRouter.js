const {
    getFeedbackbyBook,
    addFeedback,
    updateFeedback,
    deleteFeedbackById
} = require('../controllers/feedbackController');
const {
    authenticateToken,
    authorizeRoles
} = require('../middlewares/authorize');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(getFeedbackbyBook)
    .post(authenticateToken, addFeedback)

router.route('/:id')
    .patch(updateFeedback)
    .delete(deleteFeedbackById);

module.exports = router;