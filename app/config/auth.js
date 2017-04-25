module.exports = {
    // Checks whether user role correspond to required one
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.session.passport && req.session.passport.user && role.indexOf(req.session.passport.user.role) > -1) {
                next()
            } else {
                res.status(401).send({
                    message: 'You are not authorized!'
                });
            }
        }
    }
}