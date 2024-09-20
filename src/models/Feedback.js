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
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('Feedback', FeedbackSchema);