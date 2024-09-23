const Progress = require('../models/Progress');
const mongoose = require('mongoose');

// logic to get book progress
const getProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const progress = await Progress.findById(id);

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// logic to add progress
const addProgress = async (req, res) => {
    const { bookId, page } = req.body;
    try {
        const newProgress = new Progress({ bookId, page });
        await newProgress.save();
        res.status(200).json(newProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Logic to update progress
const updateProgress = async (req, res) => {
    try {
        const { id } = req.params;   
        const { page } = req.body;
        const progress = await Progress.findByIdAndUpdate(id, { page });

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.status(200).json("Progress updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProgress,
    addProgress,
    updateProgress,
}