const axios = require('axios');

exports.getBooks = async (req, res) => {
    const title = req.query.title
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then((results) => {
            // parse results:
            results = JSON.parse(JSON.stringify(results.data));

            // returned books:
            let foundBooks = results.items;

            // cut results down to 10 in case there are more than 10 results:
            if (foundBooks.length > 5) foundBooks = foundBooks.slice(0, 5);

            // booksDto (books data transfer object) is what is returned to the frontend:
            let booksDto = [];

            // for each book in foundBooks
            for (let book of foundBooks) {
                // add the details to the booksDto if they exist, otherwise 0 or ''
                booksDto.push({
                    title: (book.volumeInfo.title ? book.volumeInfo.title : ''),
                    authors: ((book.volumeInfo.authors && book.volumeInfo.authors[0]) ? book.volumeInfo.authors : ''),
                    genre: ((book.volumeInfo.categories && book.volumeInfo.categories[0]) ? book.volumeInfo.categories[0] : ''),
                    description: (book.volumeInfo.description ? book.volumeInfo.description : ''),
                    isbn: ((book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0].identifier) ? book.volumeInfo.industryIdentifiers[0].identifier : 0),
                    thumbnailUrl: ((book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ? book.volumeInfo.imageLinks.thumbnail : 'http://books.google.com/books/content?id=rbQ4MAEACAAJ&printsec=frontcover&img=1&zoom=3&source=gbs_api')
                });
            }

            // return the info to the user
            res.status(200).json({
                count: booksDto.length, // total number of books returned
                books: booksDto
            });
        })
        // catch any errors
        .catch((error) => {
            res.status(500).json(error.message)
        });
}