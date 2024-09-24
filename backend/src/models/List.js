const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    bookId : [{
        type : mongoose.Schema.Types.String,
        ref : 'Book'
    }],
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('List', ListSchema);