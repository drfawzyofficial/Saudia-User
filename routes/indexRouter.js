const express = require('express');
const router = express.Router();
const moment = require('moment');
const New = require('../models/New');
router.get('/', async (req, res, next) => {
    if(req.cookies.lang === "en") {
        const news = await New.find({  });
        res.render('english/index', { page: 'Tatx', news: news, moment: moment });
    } else {
        const news = await New.find({  });
        res.render('arabic/index', { page: 'Tatx', news: news, moment: moment }); 
    }
});

router.post('/', (req, res, next) => {
    res.cookie('lang', 'en');
    res.redirect('/');
})

router.post('/ar', (req, res, next) => {
    res.cookie('lang', 'ar');
    res.redirect('/');
})


module.exports = router;