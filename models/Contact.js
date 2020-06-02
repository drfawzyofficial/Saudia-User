const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    heading: {
        type: String,
        required: [true, 'Heading is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    }
});

let Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;