const mongoose = require('mongoose');
const residentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Agreement: {
        type: Object,
        required: [true, 'مطلوب إجباري']
    },
    personalInfo: {
        type: Object,
        required: [true, 'مطلوب إجباري']
    },
    requestData: {
        type: Object,
        required: [true, 'مطلوب إجباري']
    },
    visitors: {
        type: Array,
        required: [true, 'مطلوب إجباري']
    },
    Account: {
        type: Object,
        required: [true, 'مطلوب إجباري']
    },
    code: {
        type: String,
        required: false
    },
    visitPurpose: {
        type: String,
        required: [true, 'مطلوب إجباري']
    },
    accepted: {
        type: Boolean,
        required: [true, 'مطلوب إجباري'],
        default: false
    },
    avatar: {
        type: String,
        required: [true, 'مطلوب إجباري'],
        default: 'Image'
    },
}, { timestamps: true });
const Resident = mongoose.model('Resident', residentSchema);
module.exports = Resident;
