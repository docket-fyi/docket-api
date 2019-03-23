const debug = require('../../debug').redis

async function unknown(event, key) {
  debug(`unknown event ${event}`)
  debug(`unknown key ${key}`)
}

module.exports = unknown
