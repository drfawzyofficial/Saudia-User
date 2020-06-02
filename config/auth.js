module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) return next();
        else {
            req.flash('error', 'Please, Login to make this action');
            res.redirect('/user/login');
        }
    },
    forwardAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/user/profile');
        else return next();
    }
};