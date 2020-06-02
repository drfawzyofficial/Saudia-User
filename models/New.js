const mongoose = require('mongoose')
const newSchema = new mongoose.Schema({
    newImage: {
        type: String,
        required: true
    },
    newHeading: {
        type: String,
        required: true
    },
    newContent: {
        type: String,
        required: true
    }
}, { timestamps: true });

let New = mongoose.model('New', newSchema);
module.exports = New;