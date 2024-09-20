const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    books : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    }],
    name : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('List', ListSchema);