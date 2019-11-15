const disconnect = require('./disconnect')
const error = require('./error')
const disconnecting = require('./disconnecting')
const userConnected = require('./user-connected')
const socketEventKeys = require('../config/socket-event-keys')

const socketIOEventHandlerMapping = new Map([
  [socketEventKeys.disconnect, disconnect],
  [socketEventKeys.disconnecting, disconnecting],
  [socketEventKeys.error, error],
  [socketEventKeys.user.connected, userConnected]
])

module.exports = socketIOEventHandlerMapping
