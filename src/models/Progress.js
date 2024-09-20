const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    },
    page : {
        type : Number,
        required : true
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('Progress', ProgressSchema);