// @User Router

// Require Express Framework
const express = require('express');
const router = express.Router();

// Require forwardAuthenticated
const { forwardAuthenticated } = require('../config/auth');

// Require Packages
const passport = require('passport');

// Register Authentication
router.post('/register', forwardAuthenticated, async (req, res) => {

    try {
        const { fullname, email, password, confirmPassword } = req.body;

        if (fullname.length < 6) {
            req.flash('error', 'الاسم يجب أن يكون أكثر من 6 أحرف');
            return res.redirect('/resident')
        }
        if (!(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/.test(email))) {
            req.flash('error', 'البريد الإلكتروني يجب أن يكون جميل أو ياهو');
            return res.redirect('/resident')
        }
        if (password.length < 6) {
            req.flash('error', 'كلمة المرور يجب أن تكون أكثر من 6 أحرف');
            return res.redirect('/resident')
        }
        if (password.length !== confirmPassword.length) {
            req.flash('error', 'كلمتا المرور غير متطابقين');
            return res.redirect('/resident')
        }
        passport.authenticate('local.signup', {
            successRedirect: '/profile',
            failureRedirect: '/resident',
            failureFlash: true
        })(req, res);
    } catch (err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/resident')
    }
});


// Login Authentication
router.post('/login', forwardAuthenticated, (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'جميع الحقول يجب أن تكون مملوئة');
        res.redirect('/auth/login');
    } else {
        passport.authenticate('local.login', {
            successRedirect: '/profile',
            failureRedirect: '/resident',
            failureFlash: true
        })(req, res);
    }
});



// Logout (Session Expired)
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'تم تسجيل الخروج بنجاح');
    res.redirect('/auth/login');
});
module.exports = router;
