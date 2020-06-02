const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies.lang === "en") {
        res.render('english/faq', { page: 'Faq' });
    } else res.render('arabic/faq', { page: 'Faq' });
})

module.exports = router;