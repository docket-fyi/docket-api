const Redis = require('ioredis')

const debug = require('./debug').redis
// const io = require('./socket-io')
const environment = require('../environment')

const { host, port } = environment.redis
const primary = new Redis({
  host,
  port
  // lazyConnect: true
})
// const publisher = new Redis({
//   host,
//   port
// })
const subscriber = new Redis({
  host,
  port
})

async function createEventReminder(key, expiration) {
  debug(`creating event reminder (${key})`)
  try {
    await primary.multi()
                 .set(key, null) // eslint-disable-line dot-location
                 .expire(key, expiration) // eslint-disable-line dot-location
                 .exec() // eslint-disable-line dot-location
    debug(`event reminder created (${key})`)
  } catch (err) {
    debug(`error creating event reminder (${key})`)
    throw err
  }
}

// async function addSocketToUser(key, socketId) {
//   debug(`adding socket to user (${key})`)
//   try {
//     await primary.sadd(key, socketId)
//     debug(`socket added to user`)
//   } catch (err) {
//     debug(`error adding socket to user`)
//     throw err
//   }
// }

module.exports = {
  primary,
  // publisher,
  subscriber,
  createEventReminder
  // addSocketToUser
}
