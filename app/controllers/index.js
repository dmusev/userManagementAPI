let homeController = require('./home-controller')
let usersController = require('./users-controller')

module.exports = { // Exposes our controllers by feature
    home: homeController,
    users: usersController
}