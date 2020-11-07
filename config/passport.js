// Import Packages
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Saudia_Socket = require("socket.io-client")('http://socket.wezara.me');

// Import User Model
const Admin = require('../models/User');

// Signup Strategy for User
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        let admin = await Admin.findOne({ email: username });
        if (admin) {
            return done(null, false, req.flash('error', 'هذا الحساب موجود مُسبقًا'))
        }
        if (!admin) {
            admin = await new Admin({
                fullname: req.body.fullname,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
            }).save();
            Saudia_Socket.emit('newUser', { userID: `${ admin._id }` });
            return done(null, admin);
        }
    } catch(err) {
        console.log(err.message)
        return done(null, false, req.flash('error', `حدث خطأ في السيرفر`))
    }
}));

// Login Strategy for Admin
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    try {

        let admin = await Admin.findOne({ email: username });
        if (!admin) {
            return done(null, false, req.flash('error', 'هذا المستخدم غير موجود'))
        }
        if (admin) {
    
                bcrypt.compare(password, admin.password, (err, res) => {
                    if (err) {
                        return done(null, false, req.flash('error', `حدث خطأ ما بالسيرفر`));
                    }
                    else {
                        if (res) {
                            return done(null, admin);
                        } else {
                            return done(null, false, req.flash('error', 'خطأ بكلمة السر'));
                        }
                    }
                });
        }
    } catch(err) {
        return done(null, false, req.flash('error', `حدث خطأ ما بالسيرفر`));
    }
}));

// SerializeUser
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// DeserializeUser
passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, user) {
        if (err) done(err);
        done(null, user);
    })
});