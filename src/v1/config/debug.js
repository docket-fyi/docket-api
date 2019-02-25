const debug = require('debug')

module.exports = {
  api: debug('app:api'),
  worker: debug('app:worker'),
  mongo: debug('db:mongo'),
  redis: debug('db:redis')
}
