let mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = (config) => {
    mongoose.connect(config.db)

    let db = mongoose.connection

    db.once('open', err => {
        if (err) console.warn(err)

        console.log('MongoDB ready')
    })

    db.on('error', err => console.warn('Error with database: ' + err))

    // Seed an admin user if there are no users persisting in database
    require('../models/User').seedAdminUser()
}