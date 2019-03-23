const debug = require('../config/debug')
const io = require('../config/socket-io')
const { Event } = require('../../models')
const redis = require('../config/redis').primary

async function keyEventExpired(redisEvent, key) {
  debug.redis(`handling '${redisEvent}' event for key '${key}'`)
  switch (key) {
    case String(key.match(/^users:\w+:events:\w+$/)):
      const [users, userId, events, eventId] = key.split(':') // eslint-disable-line no-case-declarations, no-unused-vars
      // if (!userId) {}
      // if (!eventId) {}
      const userSocketIds = await redis.smembers(`users:${userId}:sockets`) // eslint-disable-line no-case-declarations
      const event = await Event.findOne({_id: eventId, userId }) // eslint-disable-line no-case-declarations
      // if (!event) {}
      userSocketIds.forEach(socketId => {
        debug.socketio(`emitting to socket '${socketId}'`)
        io.to(socketId).emit('docket_event_expired', event)
      })
      break

    default:
  }
}

module.exports = keyEventExpired
