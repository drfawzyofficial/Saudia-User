const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
router.post('/', async (req, res, next) => {
    try {
        const messages = await Message.find({ roomID: req.body.roomID });
        res.status(200).json(messages);
    } catch(err) {
       res.status(500).json({ msg: err.message })
    }
})
module.exports = router;