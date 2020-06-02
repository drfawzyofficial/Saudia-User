const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    roomID: {
        type: String, 
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
}, { timestamps: true })

let User = mongoose.model('User', userSchema);
module.exports = User;
