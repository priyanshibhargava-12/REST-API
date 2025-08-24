const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    first_name:{
        type:   String,
        required: true,
    },
    last_name:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
   
},
 { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
