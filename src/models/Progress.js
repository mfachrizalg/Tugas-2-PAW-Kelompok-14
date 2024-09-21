const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    bookId : {
        type : mongoose.Schema.Types.String,
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