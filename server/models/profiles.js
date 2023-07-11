const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender:{
        type:String, //try implementing a enum of 3 options
    },

    dateOfBirth:{
        type:String,
    },

    about:{
        type:String,
    },

    contactNumber:{
        type:Number,
        trim:true,

    },


});

module.exports = mongoose.model("Profile" , profileSchema);