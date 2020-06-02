const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies.lang === "en") {
        res.render('english/terms', { page: 'Terms' });
    } else res.render('arabic/terms', { page: 'Terms' });
})

module.exports = router;