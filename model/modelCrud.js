const mongoose = require('mongoose');

const creteSchema = mongoose.Schema({
    bookname : {
        type : String,
        required : true,
    },
    bookprice : {
        type : String,
        required : true,
    },
    bookpages : {
        type : String,
        required : true,
    },
    bookauthor : {
        type : String,
        required : true,
    },
})
const crud = mongoose.model('crud',creteSchema);
module.exports = crud;