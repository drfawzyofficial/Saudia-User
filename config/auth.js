module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) return next();
        else {
            req.flash('error', 'من أجل زيارة تلك الصفحة سجل دخولك أولًا');
            res.redirect('/resident');
        }
    },
    forwardAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/profile');
        else return next();
    }
};