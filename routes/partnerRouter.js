const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies.lang === "en") {
        res.render('english/partner', { page: 'Partner' });
    } else res.render('arabic/partner', { page: 'Partner' });
})

module.exports = router;