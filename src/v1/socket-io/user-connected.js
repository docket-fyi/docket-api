const jsonWebToken = require('jsonwebtoken')

const debug = require('../config/debug').socketio
const redis = require('../config/redis').primary
const environment = require('../environment')

function userConnected(socket, data) {
  try {
    if (!data || !data.jwt) {
      throw new Error('Missing JWT')
    }
    const jwt = jsonWebToken.verify(data.jwt, environment.jwt.secret)
    redis.sadd(`users:active`, jwt.id)
    redis.sadd(`users:${jwt.id}:sockets`, socket.id)
  } catch (err) {
    debug(`${err.name}: ${err.message}`)
    socket.emit('docket_logout')
  }
}

module.exports = userConnected
