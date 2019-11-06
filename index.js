require('./src/v1/config/sentry')

const environment = require('./src/v1/environment')
const debug = require('./src/v1/config/debug')
// const subscribeToRedisExpiredKeyEvents = require('./src/v1/config/redis')
const server = require('./src/v1/config/server')
const io = require('./src/v1/config/socket-io')
const eventHandlers = require('./src/v1/redis')
const { subscriber } = require('./src/v1/config/redis')
const socketIOEventHandlerMapping = require('./src/v1/socket-io')

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
})

// setupRedisSubscriptions()
// setupSocketIOListeners()

// subscribeToRedisExpiredKeyEvents()
server.listen(environment.api.port, () => debug.api(`server listening on port ${environment.api.port}`))
io.listen(server)
