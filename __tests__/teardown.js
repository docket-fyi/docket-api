const sequelize = require('../src/v1/config/sequelize')
const redis = require('../src/v1/config/redis')
// const io = require('../src/v1/config/socket-io')
const server = require('../src/v1/config/server')

async function globalTeardown(globalConfig) {
  await sequelize.close()
  await redis.primary.disconnect()
  await redis.subscriber.disconnect()
  await server.close()
}

module.exports = globalTeardown
