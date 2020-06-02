const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
    if(req.cookies.lang === "en") {
        const users = await User.find().sort({ _id: -1 });
        res.render('english/admin', { page: 'Admin', users: users });
    } else res.render('arabic/admin', { page: 'Admin' });
})

module.exports = router;