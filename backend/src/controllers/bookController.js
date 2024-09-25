const axios = require("axios");
const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  let title = req.query.title;
  if (!title) return res.status(400).json({ message: "Title is required" });
  title = title.replace(" ", "+");
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}`
    );
    if (data.totalItems === 0)
      return res.status(404).json({ message: "Books not found" });

    const bulkOperations = data.items.map((book) => {
      return {
        updateOne: {
          filter: { _id: book.id },
          update: {
            $set: {
              title: book.volumeInfo.title || " ",
              authors: book.volumeInfo.authors || [" "],
              publisher: book.volumeInfo.publisher || " ",
              publishedDate: book.volumeInfo.publishedDate || " ",
              description: book.volumeInfo.description || " ",
              image:
                book.volumeInfo.imageLinks?.thumbnail ||
                "http://books.google.com/books/content?id=rbQ4MAEACAAJ&printsec=frontcover&img=1&zoom=3&source=gbs_api",
              page: book.volumeInfo.pageCount || 0,
            },
          },
          upsert: true,
        },
      };
    });

    const upsertBook = Book.bulkWrite(bulkOperations);
    if (!upsertBook)
      return res.status(400).json({ message: "Failed to add books" });

    // Retrieve the updated/inserted books from the database
    const updatedBooks = await Book.find({
      _id: { $in: data.items.map((book) => book.id) },
    });

    res.status(200).send(updatedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id; // Ambil bookId dari URL params
    const book = await Book.findById(bookId); // Cari buku berdasarkan ID

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book); // Kirim respons dengan data buku
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
