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
    const { feedback, userId } = req.body;
    try {
        const newFeedback = new Feedback({ feedback, userId, bookId });
        const saveFeedback = await newFeedback.save();
        if (!saveFeedback) res.status(400).json({ message: 'Failed to add feedback' });

        res.status(200).send(newFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

// logic untuk mengupdate feedback (butuh autorisasi)
exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { feedback } = req.body;
    try {
        await Feedback.findByIdAndUpdate(id, { feedback });

        res.status(200).json({ message: 'Feedback updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}