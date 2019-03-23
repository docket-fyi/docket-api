// const jsonWebToken = require('jsonwebtoken')

const debug = require('../config/debug').socketio
const redis = require('../config/redis').primary
// const environment = require('../environment')

async function disconnect(socket/*, data*/) {
  try {
    debug('disconnect', socket.id)
    // if (!data || !data.jwt) {

    // }
    const activeUserIds = await redis.smembers('users:active')
    // for await (const userId of activeUserIds) {

    // }
    activeUserIds.forEach(async userId => {
      // console.log('userId', userId, socket.id)
      await redis.srem(`users:${userId}:sockets`, socket.id)
      const socketCountForUser = await redis.scard(`users:${userId}:sockets`)
      if (!socketCountForUser) {
        redis.srem('users:active', userId)
      }
    })
  } catch (err) {
    debug(err)
    throw err
  }
}

module.exports = disconnect
