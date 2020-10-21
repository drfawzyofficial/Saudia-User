// @Seeting Router

// Require Express Framework
const express = require('express');
const router = express.Router();

// Require forwardAuthenticated
const { forwardAuthenticated } = require('../config/auth');

// Require Packages
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Require User Model
const User = require('../models/User')


// Forgot Password Authentication
router.get('/forgot-password', forwardAuthenticated, async (req, res) => {
    try {
        res.render('Auth/auth-forgot-password');
    } catch(err) {
     req.flash('error', 'حدث خطأ ما بالسيرفر');
     res.redirect('/forgot-password')
    }
   
})
router.post('/forgot-password', forwardAuthenticated, async (req, res) => {
    if (!(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/.test(req.body.email))) {
        req.flash('error', 'البريد الإلكتروني يجب أن يكون جميل أو ياهو');
        return res.redirect('/auth/forgot-password')
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'الحساب غير موجود مُسبقًا');
        return res.redirect('/auth/forgot-password');
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AbdulrahmanFawzy999@gmail.com',
            pass: 'sxgqljelmksfsuuo'
        }
    });
    let mailOptions = {
        to: User.email,
        from: 'AbdulrahmanFawzy999@gmail.com',
        subject: 'Reset your password',
        html: `
              <p> You are receiving this because you (or someone else) has requested the reset of the password for your account. 
              </p>
              <p>
              Please click on the following link to complete the process
              </p>
              <a href=" http://localhost:3000/auth/reset-password/${User._id}" target="_blank">Follow</a>
              <p>If you did not request this, please ignore this email and your password will remain unchanged. </p>`
    };
    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            req.flash('error', `حدث خطأ ما بالسيرفر`);
            res.redirect('/auth/forgot-paswsord');
        } else {
            req.flash('success', 'قمنا بإرسال رسالة إلى بريدك الإلكتروني قم بفحصها');
            res.redirect('/auth/forgot-password');
        }
    });
});
router.get('/reset-password/:id', forwardAuthenticated, async (req, res) => {
    try {
        const User = await User.findOne({ _id: req.params.id });
        if (User) {
            res.render('Auth/resetPassword', { specialID: req.params.id })
        }
        else {
            req.flash('error', 'هذا الحساب غير موجود');
            res.redirect("/auth/forgot-password");
        }
    } catch (err) {
        req.flash('error', 'حدث خطأ ما في السيرفر');
        res.redirect("/auth/forgot-password");
    }
});
router.post('/updatePassword', forwardAuthenticated, async (req, res) => {
       try {
        const { password, confirmPassword, specialID } = req.body;


        if (password.length < 6) {
            req.flash('error', 'كلمة المرور يجب أن تكون أكثر من 6 أحرف');
            return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
        }

        if (password.length !== confirmPassword.length) {
            req.flash('error', 'كلمتا المرور غير متطابقين');
            return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
        }

        await User.findOneAndUpdate({ _id: specialID }, { password: await bcrypt.hash(password, 10) } );
        req.flash('success', 'تم تغيير كلمة السر بنجاح');
        return res.redirect(`/auth/login`);

       } catch(err) {
        req.flash('error', 'حدث خطأ ما في السيرفر');
        return res.redirect(`/auth/reset-password/${ req.body.specialID }`)
       }
       
  });

// Logout (Session Expired)
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'تم تسجيل الخروج بنجاح');
    res.redirect('/auth/login');
});
module.exports = router;
