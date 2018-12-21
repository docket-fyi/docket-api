const auth = require('./auth')
// const events = require('./events')
const users = require('./users')
const me = require('./me')
const docs = require('./docs')

module.exports = [
  auth,
  // events,
  users,
  me,
  docs
]
