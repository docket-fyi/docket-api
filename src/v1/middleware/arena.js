// const Arena = require('bull-arena')

// const queueNames = require('../config/queue-names')
// const environment = require('../environment')

// const { redis } = environment
// const { host, port } = redis

// const queues = Object.keys(queueNames).map(queueKey => ({
//   name: queueNames[queueKey],
//   hostId: 'docket',
//   redis: {
//     port,
//     host
//   }
// }))

// const arena = Arena(
//   {
//     queues
//   },
//   {
//     basePath: '/',
//     disableListen: true
//   }
// )

// module.exports = arena
