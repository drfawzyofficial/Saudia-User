const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;