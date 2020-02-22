const Sequelize = require('sequelize')

const logger = require('../config/logger')
const Secret = require('../config/secret')

let instance = null

async function connect() {
  const protocol = await Secret.get('postgres', 'DB_PROTOCOL')
  const username = await Secret.get('postgres', 'DB_USERNAME')
  const password = await Secret.get('postgres', 'DB_PASSWORD')
  const host = await Secret.get('postgres', 'DB_HOST')
  const port = await Secret.get('postgres', 'DB_PORT')
  const database = await Secret.get('postgres', 'DB_NAME')
  const dialect = await Secret.get('postgres', 'DB_DIALECT')
  const connectionUrl = `${protocol}://${username}:${password}@${host}:${port}/${database}`
  logger.info(`Connecting to ${dialect} at ${connectionUrl}...`)
  instance = new Sequelize(database, username, password, { // eslint-disable-line require-atomic-updates
    host,
    dialect,
    logging: query => logger.info(query)
  })
  logger.info(`Connected to ${dialect} at ${connectionUrl}.`)
  return instance
}

async function getInstance() {
  if (!instance) {
    instance = await connect() // eslint-disable-line require-atomic-updates
  }
  return instance
}

module.exports = {
  connect,
  getInstance
}
