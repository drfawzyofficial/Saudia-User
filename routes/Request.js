// Express Framework
const express = require('express');
const router = express.Router();

// ensureAuthenticated for protecting routes(Auth => Access, notAuth => Not Access)
const { ensureAuthenticated } = require('../config/auth');

// Import Packages
const Saudia_Socket = require("socket.io-client")('http://localhost:8080');

// Import Resident Model
const Resident = require('../models/Resident');

// Post Request to /request/resident
router.post('/resident', ensureAuthenticated, async (req, res) => {
   try {
      const founded_resident = await Resident.findOne({ userID: req.user.id, accepted: false });
      if (founded_resident) {
         res.status(404).json({ statusCode: 404, error: 'يُوجد طلب لك غير مُراجع' });
      } else {
         const temp = req.body;
         temp.userID = req.user.id;
         const resident = await new Resident(temp).save();
         Saudia_Socket.emit('resident', { userID: resident.userID, residentID: resident._id });
         res.status(200).json({ statusCode: 200, success: 'تم تسجيل البيانات بشكل ناجح', resident: resident });
      }

   } catch (err) {
      res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
   }
})

// Post Request to /request/code
router.post('/code', ensureAuthenticated, async (req, res) => {
   try {
      const { residentID, code } = req.body; 
      console.log(`${ residentID } - ${ code }`);
      if (!residentID || !code) {
         return res.status(422).json({
            statusCode: 422,
            error: 'يجب إدخال رقم الطلب ورمز الكود بشكل صحيح',
         });
      }
      var resident = await Resident.findOne({ _id: residentID });

      if(!resident) {
         return res.status(422).json({
            statusCode: 422,
            error: 'هذا الطلب غير موجود',
         });
      }

      if(resident && !resident.userID.equals(req.user.id)) {
         return res.status(422).json({
            statusCode: 422,
            error: 'هذا الطلب غير تابع إليك',
         });
      }

      if(resident.enteredCode_dashboard === code) {
         resident = await Resident.findByIdAndUpdate({ _id: residentID }, { accepted: true }, { new: true })
         res.status(200).json({ statusCode: 200, success: 'الكود الذي أدخلته صحيح وتم تفعيل طلبك بنجاح', resident: resident });
      } else  res.status(422).json({ statusCode: 422, error: 'الكود الذي أدخلته غير صحيح' });


   } catch (err) {
      res.status(500).json({ statusCode: 500, error: 'حدث خطأ في السيرفر' });
   }
})


module.exports = router;