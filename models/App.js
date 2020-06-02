const mongoose = require('mongoose')
const appSchema = new mongoose.Schema({
    app_avatar: {
        type: String,
        required: true
    },
    app_name: {
        type: String,
        required: true
    },
    app_stars: {
        type: Number,
        required: true
    },
    app_desc: {
        type: String,
        require: true
    },
    app_googleplay_link: {
        type: String,
        require: true
    },
    app_applestore_link: {
        type: String,
        require: true
    },
    app_screenshots: {
        type: Array,
        require: true
    },
    app_history: {
        type: Object,
        require: true
    }
});
let App = mongoose.model('App', appSchema);
module.exports = App;