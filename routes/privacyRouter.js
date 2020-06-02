const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies.lang === "en") {
        res.render('english/privacy', { page: 'Privacy' });
    } else res.render('arabic/privacy', { page: 'Privacy' });
})


module.exports = router;