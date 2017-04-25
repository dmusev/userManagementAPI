// Grab mongoose
let mongoose = require('mongoose')
let encryption = require('../utilities/encryption')

// Define our User schema
let userSchema = mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    forename: { type: String },
    surname: { type: String },
    created: { type: Date, default: Date.now },
    salt: String,
    hashedPwd: String,
    role: { type: String, default: 'regular' },
})

// User schema methods go here
userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashedPwd) {
            return true
        } else {
            return false
        }
    }
})

// Export the model to be used in other files
let User = mongoose.model('User', userSchema)

module.exports = {
    User: User,
    // Only creates seed admin if there are 0 users in the DB..
    seedAdminUser: () => {
        User.find({}).then(users => {
            if (users.length === 0) {
                let salt = encryption.generateSalt()
                let hashedPwd = encryption.generateHashedPassword(salt, 'admin')

                User.create({
                    emailAddress: 'admin',
                    forename: 'admin',
                    surname: 'admin',
                    created: new Date().toISOString(),
                    salt: salt,
                    hashedPwd: hashedPwd,
                    role: 'admin'
                })
            }
        })
    }
}