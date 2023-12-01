const authMiddleware = (req, res, next) => {
    if (!req.signedCookies.signed_login) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

module.exports = authMiddleware;