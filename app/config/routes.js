const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let auth = require('./auth')

let controllers = require('./../controllers/index')

module.exports = (app) => {
    // User serversite authentication route
    app.post('/api/users/authenticate', controllers.users.authenticate)

    // Gobal controllers function handler
    app.all('/api/:controller/:method', auth.isInRole(['admin', 'regular']), (req, res) => {
        let method = req.params.method;
        let controllerName = req.params.controller;

        controllers[controllerName][method](req, res);
    })

    // Global controllers function handler by id
    app.all('/api/:controller/:method/:id', auth.isInRole(['admin', 'regular']), (req, res) => {
        let method = req.params.method;
        let controllerName = req.params.controller;

        controllers[controllerName][method](req, res);
    })

    // Return home page if  any other route accessed
    app.get('/', controllers.home.index)

    app.get('*', controllers.home.index)
}