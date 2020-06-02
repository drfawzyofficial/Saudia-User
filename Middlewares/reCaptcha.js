const fetch = require('isomorphic-fetch');
module.exports = {
    handleContact: (req, res, next) => {
        const secret_key = process.env.SECRET_KEY;
        const token = req.body.token;
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
        fetch(url, {
            method: 'post'
        })
        .then(response => response.json())
        .then((go_res) => {
            if(go_res.success == false) res.status(500).json({ msg: "Invalid reCAPTCHA token" })
            else if(go_res.success == true && go_res.score <= 0.5) res.status(500).json({ msg: "Bot Message" })
            else next()
        })
        .catch(() => res.status(500).json({ msg: "Something went Wrong" }));
    }
}

// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });