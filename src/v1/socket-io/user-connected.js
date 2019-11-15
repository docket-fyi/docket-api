const jsonWebToken = require('jsonwebtoken')

const debug = require('../config/debug').socketio
const redis = require('../config/redis').primary
const environment = require('../environment')
const cacheKeys = require('../config/cache-keys')
const socketEventKeys = require('../config/socket-event-keys')

async function userConnected(socket, data) {
  try {
    if (!data || !data.jwt) {
      throw new Error('Missing JWT')
    }
    const jwt = jsonWebToken.verify(data.jwt, environment.jwt.secret)

    // Add the user ID to the set of globally active sockets
    await redis.sadd(cacheKeys.users.active, jwt.id)

    // Add the socket ID to current user's set of active sockets
    await redis.sadd(cacheKeys.users.sockets(jwt.id), socket.id)
  } catch (err) {
    debug(`${err.name}: ${err.message}`)
    socket.emit(socketEventKeys.user.logout)
  }
}

module.exports = userConnected
