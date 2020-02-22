const http = require('http')

const app = require('./express')

const server = http.createServer(app)

module.exports = server
