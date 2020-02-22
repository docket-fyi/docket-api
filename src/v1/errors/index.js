const BaseError = require('./base')
const RouteNotFoundError = require('./route-not-found')
const authentication = require('./authentication')
const events = require('./events')
const google = require('./google')
const locales = require('./locales')
const microsoft = require('./microsoft')
const search = require('./search')
const sessions = require('./sessions')
const users = require('./users')
const vault = require('./vault')
const jsonApi = require('./json-api')

module.exports = {
  BaseError,
  RouteNotFoundError,
  authentication,
  events,
  google,
  locales,
  microsoft,
  search,
  sessions,
  users,
  vault,
  jsonApi
}
