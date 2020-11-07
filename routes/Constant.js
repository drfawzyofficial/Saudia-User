const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/auth');
router.get('/', forwardAuthenticated, async (req, res, next) => {
   try {
       res.render('temp', { page: 'temp' });
   } catch(err) {
       req.flash('error', 'حدث خطأ ما بالسيرفر');
       res.redirect('/');
   }
})

module.exports = router;