const auth = require('./auth')
const docs = require('./docs')
const google = require('./google')
const healthCheck = require('./health-check')
const i18n = require('./i18n')
const me = require('./me')
const users = require('./users')

module.exports = [
  auth,
  docs,
  google,
  healthCheck,
  i18n,
  me,
  users
]
