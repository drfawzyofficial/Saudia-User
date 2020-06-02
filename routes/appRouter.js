const express = require('express');
const router = express.Router();
const App = require('../models/App');
const Appr = require('../models/Appr');
router.get('/', async (req, res, next) => {
   try {
        if(req.cookies.lang === "en") {
            const apps = await App.find();
            res.render('english/apps', { apps: apps, page: 'Apps' });
        } else {
            const apps = await App.find();
            res.render('arabic/apps', { apps: apps, page: 'Apps' });
        } 
   } catch(err) {
       console.error(err.message);
   }

});
router.get('/:id', async (req, res, next) => {
    try {
        if(req.cookies.lang === "en") {
            const app = await App.findOne({ _id: req.params.id })
            res.render('english/singleApp', { app: app, page: 'Apps' });
        } else {
            const app = await App.findOne({ _id: req.params.id })
            res.render('arabic/singleApp', { app: app, page: 'Apps' });
        }  
    } catch(err) {
        console.error(err.message);
    }
});

module.exports = router;