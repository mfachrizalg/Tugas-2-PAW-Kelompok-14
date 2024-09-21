const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    feedback : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    bookId : {
        type : mongoose.Schema.Types.String,
        ref : 'Book'
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('Feedback', FeedbackSchema);