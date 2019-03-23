const disconnect = require('./disconnect')
const error = require('./error')
const disconnecting = require('./disconnecting')
const userConnected = require('./user-connected')

const socketIOEventHandlerMapping = new Map([
  ['disconnect', disconnect],
  ['error', error],
  ['disconnecting', disconnecting],
  ['docket_user_connected', userConnected]
])

module.exports = socketIOEventHandlerMapping
