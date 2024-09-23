const {
    getFeedbackbyBook,
    addFeedback,
    updateFeedback
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
    .patch(authenticateToken, updateFeedback)

module.exports = router;