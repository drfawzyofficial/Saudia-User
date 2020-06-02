const express = require('express');
const router = express.Router();

// reCaptcha Middleware
const { handleContact } = require('../Middlewares/reCaptcha');

// Contact Controller
const { getContact, postContact } = require('../Controllers/Contact');

router.get('/', getContact)
      .post('/', handleContact, postContact);
      
module.exports = router;