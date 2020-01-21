require('./src/v1/config/sentry')

const nodeVault = require('node-vault')

const environment = require('./src/v1/environment')
const debug = require('./src/v1/config/debug')
// const subscribeToRedisExpiredKeyEvents = require('./src/v1/config/redis')
const server = require('./src/v1/config/server')
const io = require('./src/v1/config/socket-io')
const eventHandlers = require('./src/v1/redis')
const { subscriber } = require('./src/v1/config/redis')
const socketIOEventHandlerMapping = require('./src/v1/socket-io')
const vault = require('./src/v1/config/vault')

const redisEventHandlerMapping = new Map([
  [`__keyevent@${environment.redis.databaseId}__:expired`, eventHandlers.keyEventExpired],
  [`unknown`, eventHandlers.unknown]
])

subscriber.subscribe(`__keyevent@${environment.redis.databaseId}__:expired`)
subscriber.on('message', (event, key) => {
  debug.redis(`received '${event}' event for key '${key}'`)
  redisEventHandlerMapping.has(event)
    ? redisEventHandlerMapping.get(event)(event, key)
    : redisEventHandlerMapping.get('unknown')(event, key)
})

io.on('connection', socket => {
  debug.socketio('connection', socket.id)
  socket.use((packet, next) => {
    debug.socketio(`received packet '${packet[0]}'`)
    return next()
  })
  socketIOEventHandlerMapping.forEach((handler, event) => {
    socket.on(event, data => {
      debug.socketio(`handling event '${event}'`)
      handler(socket, data)
    })
  })
});

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
    debug.api(err)
    process.exit(1)
  }
})()
*/

(async () => {
  try {
    if (!process.env.VAULT_APPROLE_ROLE_ID) {
      throw new Error('VAULT_APPROLE_ROLE_ID environment variable must be provided.')
    }
    if (!process.env.VAULT_APPROLE_ROLE_SECRET_WRAP_TOKEN) {
      throw new Error('VAULT_APPROLE_ROLE_SECRET_WRAP_TOKEN environment variable must be provided.')
    }
    const { apiVersion, protocol, host, port } = environment.vault
    const endpoint = `${protocol}${host}:${port}`
    const token = process.env.VAULT_APPROLE_ROLE_SECRET_WRAP_TOKEN
    const tempVault = nodeVault({ apiVersion, endpoint, token })
    const initializedResponse = await tempVault.initialized()
    if (!initializedResponse.initialized) {
      throw new Error('Vault is not initialized.')
    }
    const statusResponse = await tempVault.status()
    if (statusResponse.sealed) {
      throw new Error('Vault is sealed.')
    }
    const unwrapResponse = await tempVault.unwrap()
    const roleId = process.env.VAULT_APPROLE_ROLE_ID
    const secretId = unwrapResponse.data.secret_id
    const approleLoginResponse = await vault.approleLogin({
      role_id: roleId,
      secret_id: secretId
    })
    vault.token = approleLoginResponse.auth.client_token // eslint-disable-line require-atomic-updates
    server.listen(environment.api.port, () => debug.api(`server listening on port ${environment.api.port}`))
    io.listen(server)
    debug.socketio('socket server listening')
  } catch (err) {
    debug.api(err)
    process.exit(1)
  }
})()

// server.listen(environment.api.port, () => debug.api(`server listening on port ${environment.api.port}`))
// io.listen(server)
