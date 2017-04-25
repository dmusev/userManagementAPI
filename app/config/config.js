const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
    // Development config
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/test',
        port: 8081
    },
    // Production config for future use
    production: {
        rootPath: rootPath,
        db: process.env.MONGO_DB_CONN_STRING,
        port: process.env.port
    }
}