const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/bookstore");

const DB = mongoose.connection;
DB.on('err',console.error.bind(console,"DB Is Not Connect"));

DB.on('connected',(err)=>{
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log('DB Is Connected');
});
module.exports = DB;