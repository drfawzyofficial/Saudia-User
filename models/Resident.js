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
    enteredCode_dashboard: {
        type: String,
        required: false
    },
    enteredCode_user: {
        type: String,
        required: false
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
const Resident = mongoose.model('Resident', residentSchema);
module.exports = Resident;
