const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

let Message = mongoose.model('Message', messageSchema);
module.exports = Message;