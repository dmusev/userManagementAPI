const passport = require('passport')
const LocalPassport = require('passport-local')
const User = require('mongoose').model('User')

module.exports = () => {
    passport.use(new LocalPassport({
            usernameField: 'emailAddress',
            passwordField: 'password'
        },
        (username, password, done) => {
            User
                .findOne({ emailAddress: username })
                .then(user => {
                    if (!user) return done(null, false)
                    if (!user.authenticate(password)) return done(null, false)
                    return done(null, user)
                })
        }))

    passport.serializeUser((user, done) => {
        if (user) return done(null, user)
    })

    passport.deserializeUser((user, done) => {
        if (!user) return done(null, false)
        return done(null, user)
    })
}