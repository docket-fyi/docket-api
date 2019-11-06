const sessions = require('./sessions')
const docs = require('./docs')
const google = require('./google')
const healthCheck = require('./health-check')
const locales = require('./locales')
const my = require('./my')
const microsoft = require('./microsoft')
const users = require('./users')
const search = require('./search')

module.exports = {
  sessions,
  docs,
  google,
  healthCheck,
  locales,
  my,
  microsoft,
  users,
  search
}
