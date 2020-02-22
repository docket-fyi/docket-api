const Redis = require('ioredis')

// const debug = require('./debug').redis
const logger = require('./logger')
// const io = require('./socket-io')
// const environment = require('../environment')
const Secret = require('../config/secret')

let primaryInstance = null
let subscriberInstance = null

// async function getInstances() {
//   const host = await Secret.get('redis', 'REDIS_HOST')
//   const port = await Secret.get('redis', 'REDIS_PORT')
//   if (!primaryInstance) {
//     primaryInstance = new Redis({
//       host,
//       port
//       // lazyConnect: true
//     })
//   }
//   if (!subscriberInstance) {
//     subscriberInstance = new Redis({
//       host,
//       port
//     })
//   }
//   return {
//     primaryInstance,
//     subscriberInstance
//   }
// }

async function getPrimaryInstance() {
  // const instances = await getInstances()
  // return instances.primaryInstance
  if (!primaryInstance) {
    const protocol = await Secret.get('redis', 'REDIS_PROTOCOL')
    // const username = await Secret.get('redis', 'REDIS_USERNAME')
    // const password = await Secret.get('redis', 'REDIS_PASSWORD')
    const host = await Secret.get('redis', 'REDIS_HOST')
    const port = await Secret.get('redis', 'REDIS_PORT')
    const databaseId = await Secret.get('redis', 'REDIS_DATABASE_ID')
    const connectionUrl = `${protocol}://${host}:${port}/${databaseId}`
    logger.info(`Connecting to primary Redis at ${connectionUrl}...`)
    primaryInstance = new Redis({ // eslint-disable-line require-atomic-updates
      host,
      port
      // lazyConnect: true
    })
    logger.info(`Connected to primary Redis at ${connectionUrl}`)
  }
  return primaryInstance
}

async function getSubscriberInstance() {
  // const instances = await getInstances()
  // return instances.subscriberInstance
  if (!subscriberInstance) {
    const protocol = await Secret.get('redis', 'REDIS_PROTOCOL')
    // const username = await Secret.get('redis', 'REDIS_USERNAME')
    // const password = await Secret.get('redis', 'REDIS_PASSWORD')
    const host = await Secret.get('redis', 'REDIS_HOST')
    const port = await Secret.get('redis', 'REDIS_PORT')
    const databaseId = await Secret.get('redis', 'REDIS_DATABASE_ID')
    const connectionUrl = `${protocol}://${host}:${port}/${databaseId}`
    logger.info(`Connecting to subscriber Redis at ${connectionUrl}...`)
    primaryInstance = new Redis({ // eslint-disable-line require-atomic-updates
      host,
      port
      // lazyConnect: true
    })
    logger.info(`Connected to subscriber Redis at ${connectionUrl}`)
  }
  return subscriberInstance
}

// const { host, port } = environment.redis
// const primary = new Redis({
//   host,
//   port
//   // lazyConnect: true
// })
// const publisher = new Redis({
//   host,
//   port
// })
// const subscriber = new Redis({
//   host,
//   port
// })

async function createEventReminder(key, expiration) {
  logger.info(`creating event reminder (${key})`)
  try {
    await primaryInstance.multi()
                         .set(key, null) // eslint-disable-line dot-location
                         .expire(key, expiration) // eslint-disable-line dot-location
                         .exec() // eslint-disable-line dot-location
    logger.info(`event reminder created (${key})`)
  } catch (err) {
    logger.error(`error creating event reminder (${key})`)
    throw err
  }
}

// async function addSocketToUser(key, socketId) {
//   logger.info(`adding socket to user (${key})`)
//   try {
//     await primary.sadd(key, socketId)
//     logger.info(`socket added to user`)
//   } catch (err) {
//     logger.error(`error adding socket to user`)
//     throw err
//   }
// }

module.exports = {
  getPrimaryInstance,
  getSubscriberInstance,
  // primary,
  // publisher,
  // subscriber,
  createEventReminder
  // addSocketToUser
}
