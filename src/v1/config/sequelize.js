const Sequelize = require('sequelize')

const { postgres } = require('../environment')
// const debug = require('../config/debug')

const {
  database,
  username,
  password,
  host,
  // port,
  dialect
} = postgres

const sequelize = new Sequelize(database, username, password, {
  // host: `${host}:${port}`,
  host,
  dialect
  // logging: ...
})

module.exports = sequelize
