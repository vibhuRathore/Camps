const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campGroundSchema = new Schema({
    name : {
        type : String,
        // required : true
    },
    price : {
        type : Number,
        // required : true
    },
    description : {
        type  : String ,
    },
    location : {
        type : String
    }
});

module.exports = mongoose.model('Campground' , campGroundSchema); 