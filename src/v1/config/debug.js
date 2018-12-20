const debug = require('debug')

module.exports = {
  api: debug('app:api'),
  mongo: debug('db:mongo')
}
