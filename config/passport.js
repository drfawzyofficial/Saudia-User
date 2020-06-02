const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const passport = require('passport');

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {

    Admin.findOne({ email: username }, (err, admin) => {

        if (err) {
            return done(null, false, { message: 'Something wrong happened' })
        }
        if (!admin) {
            return done(null, false, { message: 'Admin is not found' });
        }
        if (admin) {
               bcrypt.compare(password, admin.password, (err, res) => {
                   if(err) console.log(err);
                   else {
                        if (res) {
                            return done(null, admin);
                        } else {
                            return done(null, false, { message: 'Password is not correct' });
                        }
                   }    
              });  
            }
    })
}));

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
        if (err) done(err);
        if (admin) done(null, admin);
    });
});