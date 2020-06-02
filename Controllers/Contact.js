const Contact = require('../models/Contact');
module.exports = {
    getContact: (req, res, next) => {
        if(req.cookies.lang === "en") {
            res.render('english/contact', { page: 'Contact', csrfToken: req.csrfToken() });
        } else res.render('arabic/contact', { page: 'Contact', csrfToken: req.csrfToken() });
    },
    postContact: async (req, res, next) => {
        try {

            const { fullname, email, heading, message } = req.body;
    
            if(fullname.trim().length === 0 || email.trim().length === 0 || heading.trim().length === 0 || message.trim().length === 0 ) 
                throw new Error("All fields are required")
    
            if(fullname.length < 3)
                throw new Error("Fullname must be at least 3 characters")
    
            if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)))
                throw new Error("Email Address is wrong");
    
            if(heading.length < 3)
                throw new Error("Heading must be at least 3 characters");
    
            if(message.length < 3 || message.length > 255)
                throw new Error("Message must be between [3-255]")
        
            let contact = await new Contact({ fullname: fullname, email: email, heading: heading, message: message }).save()
            
            res.status(200).json({
                requestType: 'POST',
                endpoint: '/contact',
                err: 0,
                msg: 'The Contact has been sent Successfully',
                contact: contact
            })
        } catch(err) {
            res.status(500).json({
                requestType: 'POST',
                endpoint: '/contact',
                err: 1,
                msg: err.message,
                source: 'from Try/Catch Error'
            })
        }
    }
}