const users = require('./users')
const me = require('./me')
const auth = require('./auth')
const docs = require('./docs')
const healthCheck = require('./health-check')

module.exports = {
  users,
  me,
  auth,
  docs,
  healthCheck
}
