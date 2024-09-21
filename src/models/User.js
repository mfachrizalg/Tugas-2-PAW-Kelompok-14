const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    bookId : [{
        type : mongoose.Schema.Types.String,
        ref : 'Book'
    }],
    listId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'List'
    }],
    progressId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Progress'
    }]
})

module.exports = mongoose.model('User', UserSchema);