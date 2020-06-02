const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.get('/:id', async (req, res, next) => {
    if(req.cookies.lang === "en") {
        const user = await User.findOne({ roomID: req.params.id });
        if(!user) res.redirect('/admin')
        else  res.render('english/chat', { page: 'Admin', user: user });
    } else res.render('arabic/chat', { page: 'Admin' });
})

module.exports = router;