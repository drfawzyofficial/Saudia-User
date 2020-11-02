// Express Framework
const express = require('express');
const router = express.Router();

// ensureAuthenticated for protecting routes(Auth => Access, notAuth => Not Access)
const { ensureAuthenticated } = require('../config/auth');

// Import Resident Model
const Resident = require('../models/Resident');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const residents = await Resident.find({ userID: req.user.id });
        res.render('requests', { residents: residents, page: 'requests' });
    } catch(err) {
        req.flash('error', 'حدث خطأ ما بالسيرفر');
        res.redirect('/profile');
    }
 });
 
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
     const founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
     if(founded_resident) {
        res.status(404).json({ statusCode: 404, error: 'يُوجد طلب لك غير مُراجع' });
     } else {
        const temp = req.body;
        temp.userID = req.user.id;
        const resident = await new Resident(temp).save();
        Saudia_Socket.emit('resident', { userID: resident.userID, residentID: resident._id });
        res.status(200).json({ statusCode: 200, success: 'تم تسجيل البيانات بشكل ناجح', resident: resident });
     }
     
    } catch(err) {
       res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
    }
 })
 
 
module.exports = router;