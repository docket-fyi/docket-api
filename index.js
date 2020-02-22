const Secret = require('./src/v1/config/secret')
const logger = require('./src/v1/config/logger')
// const environment = require('./src/v1/environment')
const vault = require('./src/v1/config/vault')
// const subscribeToRedisExpiredKeyEvents = require('./src/v1/config/redis')
// const server = require('./src/v1/config/server')
// const io = require('./src/v1/config/socket-io')
// const eventHandlers = require('./src/v1/redis')
// const { subscriber } = require('./src/v1/config/redis')
// const socketIOEventHandlerMapping = require('./src/v1/socket-io')
const errors = require('./src/v1/errors')
const sentry = require('./src/v1/config/sentry')
const sequelize = require('./src/v1/config/sequelize')
const models = require('./src/v1/models')
const redis = require('./src/v1/config/redis')

// io.on('connection', socket => {
//   // debug.socketio('connection', socket.id)
//   logger.info('connection', socket.id)
//   socket.use((packet, next) => {
//     // debug.socketio(`received packet '${packet[0]}'`)
//     logger.info(`received packet '${packet[0]}'`)
//     return next()
//   })
//   socketIOEventHandlerMapping.forEach((handler, event) => {
//     socket.on(event, data => {
//       // debug.socketio(`handling event '${event}'`)
//       logger.info(`handling event '${event}'`)
//       handler(socket, data)
//     })
//   })
// })

/*
(async () => {
  try {
    await Promise.all([
      setupRedisSubscriptions()
      setupSocketIOListeners()
      subscribeToRedisExpiredKeyEvents()
      configureVault()
    ])
    server.listen()
    io.listen()
  } catch (err) {
    // debug.api(err)
    logger.fatal(err)
    process.exit(1)
  }
})()
*/

async function main() {
  try {
    if (!process.env.VAULT_TOKEN) {
      throw new errors.vault.MissingTokenError()
    }
    // if (!process.env.VAULT_APPROLE_ROLE_ID) {
    //   throw new Error('VAULT_APPROLE_ROLE_ID environment variable must be provided.')
    // }
    // if (!process.env.VAULT_APPROLE_SECRET_WRAP_TOKEN) {
    //   throw new Error('VAULT_APPROLE_SECRET_WRAP_TOKEN environment variable must be provided.')
    // }
    const apiVersion = process.env.VAULT_API_VERSION || 'v1'
    const protocol = process.env.VAULT_PROTOCOL || 'http'
    const host = process.env.VAULT_HOST || 'docket-vault'
    const port = process.env.VAULT_PORT || 8200
    const token = process.env.VAULT_TOKEN
    const endpoint = `${protocol}://${host}:${port}`
    // const token = process.env.VAULT_APPROLE_SECRET_WRAP_TOKEN
    logger.info(`Connecting to Vault at ${endpoint}...`)
    vault.apiVersion = apiVersion
    vault.endpoint = endpoint
    vault.token = token
    const initializedResponse = await vault.initialized()
    if (!initializedResponse.initialized) throw new errors.vault.NotInitializedError()
    const statusResponse = await vault.status()
    if (statusResponse.sealed) throw new errors.vault.SealedError()
    logger.info(`Connected to Vault at ${endpoint}.`)
    // const unwrapResponse = await vault.unwrap()
    // const roleId = process.env.VAULT_APPROLE_ROLE_ID
    // const secretId = unwrapResponse.data.secret_id
    // const approleLoginResponse = await vault.approleLogin({
    //   role_id: roleId,
    //   secret_id: secretId
    // })
    // vault.token = approleLoginResponse.auth.client_token // eslint-disable-line require-atomic-updates
    await sequelize.connect()
    await Promise.all([
      sentry.init(),
      redis.getPrimaryInstance(),
      redis.getSubscriberInstance()
    ])
    await models.init()
    const server = require('./src/v1/config/server')
    // const redisEventHandlerMapping = new Map([
    //   [`__keyevent@${environment.redis.databaseId}__:expired`, eventHandlers.keyEventExpired],
    //   [`unknown`, eventHandlers.unknown]
    // ])

    // subscriber.subscribe(`__keyevent@${environment.redis.databaseId}__:expired`)
    // subscriber.on('message', (event, key) => {
    //   debug.redis(`received '${event}' event for key '${key}'`)
    //   logger.info(`received '${event}' event for key '${key}'`)
    //   redisEventHandlerMapping.has(event)
    //     ? redisEventHandlerMapping.get(event)(event, key)
    //     : redisEventHandlerMapping.get('unknown')(event, key)
    // })

    const apiPort = await Secret.get('api', 'PORT')
    server.listen(apiPort, () => logger.info(`server listening on port ${apiPort}`))
    // io.listen(server)
    logger.info('socket server listening')
  } catch (err) {
    logger.fatal(err)
    process.exit(1)
  }
}

main()
