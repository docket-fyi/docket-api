// const jsonWebToken = require('jsonwebtoken')

const debug = require('../config/debug').socketio
const redis = require('../config/redis').primary
// const environment = require('../environment')
const cacheKeys = require('../config/cache-keys')

async function disconnect(socket/*, data*/) {
  try {
    debug('disconnect', socket.id)
    const allActiveUserIds = await redis.smembers(cacheKeys.users.active)
    for (const userId of allActiveUserIds) {
      /**
       * Remove the current socket ID from the current user's
       * set active socket IDs.
       */
      await redis.srem(cacheKeys.users.sockets(userId), socket.id) // eslint-disable-line no-await-in-loop

      // Get a count of all active sockets for the current user
      const socketCountForUser = await redis.scard(cacheKeys.users.sockets(userId)) // eslint-disable-line no-await-in-loop

      /**
       * If the current user has no more active socket IDs,
       * remove the user ID from the set of globally active
       * sockets.
       */
      if (!socketCountForUser) {
        await redis.srem(cacheKeys.users.active, userId) // eslint-disable-line no-await-in-loop
      }
    }
  } catch (err) {
    debug(err)
    throw err
  }
}

module.exports = disconnect
