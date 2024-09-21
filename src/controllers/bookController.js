const axios = require('axios');
const Book = require('../models/Book');
const mongoose = require('mongoose');

exports.getBooks = async (req, res) => {
    let session;
    let title = req.query.title;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    title = title.replace(' ', '+');
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
        if (data.totalItems === 0) return res.status(404).json({ message: 'Books not found' });

        const bulkOperations = data.items.map(book => {
            return {
                updateOne: {
                    filter: { _id: book.id },
                    update: {
                        $set: {
                            title: book.volumeInfo.title || ' ',
                            authors: book.volumeInfo.authors || [' '],
                            publisher: book.volumeInfo.publisher || ' ',
                            publishedDate: book.volumeInfo.publishedDate || ' ',
                            description: book.volumeInfo.description || ' ',
                            image: book.volumeInfo.imageLinks?.thumbnail || 'http://books.google.com/books/content?id=rbQ4MAEACAAJ&printsec=frontcover&img=1&zoom=3&source=gbs_api'
                        }
                    },
                    upsert: true // Insert if it doesn't exist
                }
            };
        });

        // Execute bulk write
        await Book.bulkWrite(bulkOperations, { session });

        // Retrieve the updated/inserted books from the database
        const updatedBooks = await Book.find({
            _id: { $in: data.items.map(book => book.id) }
        });

        await session.commitTransaction();

        // Return the updated/inserted books as the response
        res.status(200).send(updatedBooks);

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: error.message });
    } finally {
        if (session) session.endSession();
    }
};