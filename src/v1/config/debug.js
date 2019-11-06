const debug = require('debug')

module.exports = {
  api: debug('app:api'),
  google: debug('app:google'),
  microsoft: debug('app:microsoft'),
  worker: debug('app:worker'),
  socketio: debug('app:socketio'),
  mongo: debug('db:mongo'),
  redis: debug('db:redis'),
  postgres: debug('db:postgres')
}
