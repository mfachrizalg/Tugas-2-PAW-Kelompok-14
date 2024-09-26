const Progress = require('../models/Progress');
const User = require('../models/User');
const Book = require('../models/Book');
const mongoose = require('mongoose');

// logic to get book progress
const getAllProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('progressId');
        const finished = user.progressId.filter(progress => progress.status === 'Finished');
        const reading = user.progressId.filter(progress => progress.status === 'Reading');
        res.status(200).json({ finished, reading });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// logic to add progress
const addProgress = async (req, res) => {
    let session, status;
    const { bookId } = req.params;
    const { page } = req.body;
    try {
        [user, session, book] = await Promise.all([User.findById(req.user.id), mongoose.startSession(), Book.findById(bookId)]);
        if (!book) return res.status(404).json('Book not found');
        session.startTransaction();
        if (page > book.page) return res.status(400).json('Page exceeds total page');
        if (page < 0) return res.status(400).json('Page must be positive');
        page === book.page ? status = 'Finished' : status = 'Reading';
        const newProgress = await Progress.findOneAndUpdate({ userId : user._id }, { page,status }, {new:true,session,upsert: true});
        console.log(newProgress)
        if (!user.progressId.includes(newProgress._id)) user.progressId.push(newProgress._id)
        await user.save({session});
        await session.commitTransaction();
        res.status(200).json({'message': 'Progress added successfully'});
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json(error.message);
    } finally {
        if (session) session.endSession();
    }
}

// logic to delete progress
const deleteProgress = async (req, res) => {
    let session;
    const { progressId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        session = await mongoose.startSession();
        session.startTransaction();

        // Cari progress berdasarkan userId dan progressId
        const progress = await Progress.findOneAndDelete({ userId: user._id, progressId }, { session });
        if (!progress) return res.status(404).json('Progress not found');
        
        // Hapus progress dari array progressId di User
        user.progressId = user.progressId.filter(id => !id.equals(progress._id));
        await user.save({ session });

        await session.commitTransaction();
        res.status(200).json({ message: 'Progress deleted successfully' });
    } catch (error) {
        if (session) await session.abortTransaction();
        res.status(500).json(error.message);
    } finally {
        if (session) session.endSession();
    }
};

module.exports = {
    getAllProgress,
    addProgress,
    deleteProgress
};
