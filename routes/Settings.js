// Express Framework
const express = require('express');
const router = express.Router();

// Import Packages
const bcrypt = require('bcryptjs');

// ensureAuthenticated for protecting routes(Auth => Access, notAuth => Not Access)
const { ensureAuthenticated } = require('../config/auth');

// Import User Model
const User = require('../models/User');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        res.render('Settings', { page: 'settings' });
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 });


 router.post('/editInfo', ensureAuthenticated, async (req, res, next) => {
    try {
        const { fullname, email } = req.body;

        if (fullname.length < 6) {
            req.flash('error', 'الاسم يجب أن يكون أكثر من 6 أحرف');
            return res.redirect(`/settings`);
        }
        if (!(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/.test(email))) {
            req.flash('error', 'البريد الإلكتروني يجب أن يكون جميل أو ياهو');
            return res.redirect(`/settings`);
        }
        const user = await User.findOne({ _id: req.user.id });
        if (user.email === email) {
            await User.findByIdAndUpdate({ _id: req.user.id }, { fullname: fullname });
            req.flash('success', 'تم تعديل البيانات بنجاح');
            res.redirect(`/settings`);
        } else {
            const emailFounded = await User.findOne({ email: email });
            if (emailFounded) {
                req.flash('error', 'هذا الحساب موجود مُسبقًا');
                res.redirect(`/settings`);
            } else {
                await User.findByIdAndUpdate({ _id: req.user.id }, { fullname: fullname, email: email });
                req.flash('success', 'تم تعديل البيانات بنجاح');
                res.redirect(`/settings`);
            }
        }
    } catch (err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect(`/settings`);
    }
});

router.post('/changePassword', ensureAuthenticated, async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;


        if (password.length < 6) {
            req.flash('error', 'كلمة المرور يجب أن تكون أكثر من 6 أحرف');
            return res.redirect(`/settings`);
        }

        if (password.length !== confirmPassword.length) {
            req.flash('error', 'كلمتا المرور غير متطابقين');
            return res.redirect(`/settings`);
        }

        await User.findOneAndUpdate({ _id: req.user._id }, { password: await bcrypt.hash(password, 10) });
        req.flash('success', 'تم تغيير كلمة السر بنجاح');
        return res.redirect(`/settings`);

    } catch (err) {
        req.flash('error', 'حدث خطأ ما في السيرفر');
        res.redirect(`/settings`);
    }
});



 
module.exports = router;