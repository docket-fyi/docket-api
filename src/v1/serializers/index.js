const healthCheck = require('./health-check')
const search = require('./search')
const sessions = require('./sessions')
const users = require('./users')
const my = require('./my')
const locales = require('./locales')
const google = require('./google')
const microsoft = require('./microsoft')

module.exports = {
  healthCheck,
  search,
  sessions,
  users,
  my,
  locales,
  google,
  microsoft
}
