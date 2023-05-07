const mongoose = require('mongoose')
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    phone_no: {
        type: String,
        require: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: String
    },
    browser_token:{
        type:String
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;