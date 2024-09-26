const axios = require('axios');
const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    let title = req.query.title;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    title = title.replace(' ', '+');
    try {
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
                            image: book.volumeInfo.imageLinks?.thumbnail || 'http://books.google.com/books/content?id=rbQ4MAEACAAJ&printsec=frontcover&img=1&zoom=3&source=gbs_api',
                            page : book.volumeInfo.pageCount || 0
                        }
                    },
                    upsert: true
                }
            };
        });

        const upsertBook =  Book.bulkWrite(bulkOperations);
        if(!upsertBook) return res.status(400).json({ message: 'Failed to add books' });

        // Retrieve the updated/inserted books from the database
        const updatedBooks = await Book.find({
            _id: { $in: data.items.map(book => book.id) }
        });

        res.status(200).send(updatedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        // Mengambil semua buku dari koleksi Book di MongoDB
        const books = await Book.find();

        // Jika tidak ada buku yang ditemukan, berikan respons 404
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        // Jika buku ditemukan, kirimkan dalam respons 200
        res.status(200).json(books);
    } catch (error) {
        // Jika ada kesalahan, berikan respons error 500
        res.status(500).json({ message: error.message });
    }
};