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