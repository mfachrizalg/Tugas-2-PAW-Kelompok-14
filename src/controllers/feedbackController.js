const Feedback = require('../models/Feedback');

// logic untuk melihat feedback yang ada dari buku
exports.getFeedbackbyBook = async (req, res) => {
    const { bookId } = req.query;
    try {
        const feedbacks = await Feedback.find({bookId});

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// logic untuk menambahkan feedback (butuh autorisasi)
exports.addFeedback = async (req, res) => {
    const { bookId } = req.query;
    const { feedback, rating } = req.body;
    try {
        const newFeedback = new Feedback({ feedback, userId : req.user.id, bookId, rating });
        const saveFeedback = await newFeedback.save();
        if (!saveFeedback) res.status(400).json({ message: 'Failed to add feedback' });
        res.status(200).send(newFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// logic untuk mengupdate feedback (butuh autorisasi)
exports.updateFeedback = async (req, res) => {
    const updateBody = {};
    const { id } = req.params;
    const { feedback, rating } = req.body;
    if (!feedback && !rating) return res.status(400).json({ message: 'Feedback or rating is required' });
    if (feedback) updateBody.feedback = feedback;
    if (rating) updateBody.rating = rating;
    try {
        await Feedback.findByIdAndUpdate(id, updateBody);

        res.status(200).json({ message: 'Feedback updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// logic untuk menghapus feedback (butuh autorisasi)
exports.deleteFeedbackById = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
