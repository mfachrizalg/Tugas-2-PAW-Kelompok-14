const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    bookId : {
        type : mongoose.Schema.Types.String,
        ref : 'Book'
    },
    page : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['Reading', 'Finished']
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('Progress', ProgressSchema);