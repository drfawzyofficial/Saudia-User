const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        res.render('Profile', { page: 'profile' });
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 })
 
module.exports = router;