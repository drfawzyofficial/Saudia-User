const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.post('/resident', ensureAuthenticated, async (req, res) => {
    try {
      console.log(req.body);
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 })
 
module.exports = router;