require('dotenv').config()

module.exports = require(`./${process.env.NODE_ENV || 'development'}`)
