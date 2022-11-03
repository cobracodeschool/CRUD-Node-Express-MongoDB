const mongoose = require('mongoose');

/* Mongoose Schema allows to define shape and content of the document */
var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);
/*  called a method of mongoose model inside the model specified 
the document name and shape of the document*/

module.exports = Userdb