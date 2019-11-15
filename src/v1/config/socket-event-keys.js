const prefix = 'docket';
const separator = '_';

function key(...pieces) {
  return Array.from([prefix, /*environment, */...pieces]).join(separator);
}

module.exports = {
  // global: {},
  // builtin: {},
  // custom: {}
  connection: 'connection',
  disconnect: 'disconnect',
  disconnecting: 'disconnecting',
  error: 'error',
  user: {
    login: key('user', 'login'),
    connected: key('user', 'connected'),
    logout: key('user', 'logout')
  },
  event: {
    expired: key('event', 'expired')
  }
}
