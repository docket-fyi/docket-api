const auth = require('./auth')
const users = require('./users')
const me = require('./me')
const docs = require('./docs')
const healthCheck = require('./health-check')

module.exports = [
  auth,
  users,
  me,
  docs,
  healthCheck
]
