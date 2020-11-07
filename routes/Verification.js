// Express Framework
const express = require('express');
const router = express.Router();

// ensureAuthenticated for protecting routes(Auth => Access, notAuth => Not Access)
const { ensureAuthenticated } = require('../config/auth');


// Import Packages
const Saudia_Socket = require("socket.io-client")('http://socket.wezara.me');

// Import Models
const Resident = require('../models/Resident');
const User = require('../models/User');

// Get Request to /verification
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
        if (!founded_resident) {
            req.flash('error', 'لأ يوجد لك طلب يحتاج إلى مراجعة. قم بإرسال طلب جديد');
            res.redirect('/profile');
        }  else {
            res.render('Verification', { page: 'Verification', resident: founded_resident });
        }
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 });
 // POST Request to /verification/sendCode
 router.post('/sendCode', ensureAuthenticated, async (req, res) => {
    try {
        const code = req.body.code;
        if(!code) {
            req.flash('error', 'رمز الكود إحباري أدخله بشكل صحيح');
            return res.redirect('/requests');
        }
        var founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
        if (!founded_resident) {
            req.flash('error', 'لأ يوجد لك طلب يحتاج إلى مراجعة. قم بإرسال طلب جديد');
            res.redirect('/profile');
        }  else {
            founded_resident = await Resident.findOneAndUpdate({ userID: req.user.id, accepted: false }, { code: code.trim() }, { new: true });
            Saudia_Socket.emit('code', { codeStatus: true, userID: founded_resident.userID, residentID: founded_resident._id, code: founded_resident.code });
            req.flash('success', 'تم إرسال الكود بنجاح');
            res.redirect('/requests');
        }
    } catch(err) {
        console.log(err.message);
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 });

 // POST Request to /verification/resendCode
 router.post('/resendCode', ensureAuthenticated, async (req, res) => {
    try {
        var founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
        console.log(founded_resident);
        if (!founded_resident) {
            req.flash('error', 'لأ يوجد لك طلب يحتاج إلى مراجعة. قم بإرسال طلب جديد');
            res.redirect('/profile');
        }  else {
            if(founded_resident.code) {
                req.flash('error', 'لأ يمكن طلب إعادة إرسال الرمز الكودي وأنتَ قد قُمت بإرسالة سابقًا');
                res.redirect('/requests');
            } else {
                Saudia_Socket.emit('code', { codeStatus: false, userID: founded_resident.userID, residentID: founded_resident._id, code: 'notFound' });
                req.flash('success', 'تم طلب إعادة إرسال الرمز الكودي بنجاح');
                res.redirect('/requests');
            }
        }
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 });
 
module.exports = router;