const List = require('../models/List');
const User = require('../models/User');
const Book = require('../models/Book');
const mongoose = require('mongoose');

const getAllList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .populate({
            path :'listId',
            populate : ({
                path : 'bookId',
                limit : 5
            })
        })
        .select('listId -_id');
        res.status(200).json(user.listId);
    } catch (error) {
       res.status(500).json(error.message);
    } 
} 

const addList = async (req, res) => {
    let session;
    const { name, description } = req.body;
    if (!name || !description) return res.status(400).send('Name and description are required');
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const list = new List({ name, description });
        await User.findByIdAndUpdate(req.user.id, { $push: { listId: list._id } }, { session });
        await list.save({ session });
        await session.commitTransaction();
        res.status(200).json({"message": "List added successfully"});
    } catch (error) {
        await session.abortTransaction();
       res.status(500).json(error.message);
    } finally {
        if (session) session.endSession();
    }
}

const updateList = async (req, res) => {
    const updateBody = {}
    const { name, description } = req.body;
    if (!name && !description) return res.status(400).send('Name or description is required');
    if (name) updateBody.name = name;
    if (description) updateBody.description = description;
    try {
        const { id } = req.params;
        const foundList = await List.findById(id);
        if (!foundList) return res.status(404).json({"message" : 'List not found'});
        await List.findByIdAndUpdate(id, updateBody);
        res.status(200).json({"message" : "Your list updated successfully"});
    }
    catch (error) {
       res.status(500).json(error.message);
    }
}

const deleteList = async (req, res) => {
     try {
          const { id } = req.params;
          const foundList = await List.findById(id);
          if (!foundList) return res.status(404).json({"message" : 'List not found'});
          await List.findByIdAndDelete(id);
          res.status(200).json({"message" : "Your list deleted successfully"});
     } catch (error) {
         res.status(500).json(error.message);            
    }
}

const addBookToList = async (req, res) => {
    const { id } = req.params;
    try {
        const {bookId} = req.body;
        const foundBook = await Book.findById(bookId)
        if (!foundBook) return res.status(404).json({"message" : 'Book not found'});
        const foundList = await List.findById(id);
        if (!foundList) return res.status(404).json({"message" : 'List not found'});

        if (!foundList.bookId.includes(bookId)) {
            foundList.bookId.push(bookId);
            await foundList.save();
            res.status(200).json({'message' : "Book added successfully to list"});
        } else {
            res.status(400).json({'message' : "Book already in list"});
        }
    } catch (error) {
       res.status(500).json(error.message);
    }
};

const deleteBookFromList = async (req, res) => {
    try {
        const { listId, bookId } = req.body;
        const list = await List.findById(listId);
        
        const bookIndex = list.bookId.indexOf(bookId);
        if (bookIndex > -1) {
            list.bookId.splice(bookIndex, 1);
            await list.save();
            res.status(200).json({'message' : "Book added successfully to list"});
        } else {
            res.status(400).json({'message' : "Book not found in list"});
        }
    } catch (error) {
       res.status(500).json(error.message);
    }
};

module.exports = {
    getAllList,
    addList,
    updateList,
    deleteList,
    addBookToList,
    deleteBookFromList
}