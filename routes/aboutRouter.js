const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies.lang === "en") {
        res.render('english/about', { page: 'About' });
    } else  res.render('arabic/about', { page: 'About' });
})

module.exports = router;