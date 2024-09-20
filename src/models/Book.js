const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    authors : [{
        type : String
    }],
    publishedDate : {
        type : String
    },
    publisher : {
        type : String
    },
    description : {
        type : String
    },
    page: {
        type: Number
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Book', BookSchema);