const auth = require('./auth')
const docs = require('./docs')
const google = require('./google')
const healthCheck = require('./health-check')
const me = require('./me')
const users = require('./users')

module.exports = {
  auth,
  docs,
  google,
  healthCheck,
  me,
  users
}
