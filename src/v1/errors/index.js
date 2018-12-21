const BaseError = require('./base')
const AuthorizationHeaderMissingError = require('./authorization-header-missing')
const MalformedAuthorizationHeaderError = require('./malformed-authorization-header')
const MalformedJwtError = require('./malformed-jwt')
const MissingJwtError = require('./missing-jwt')
const EventNotFoundError = require('./event-not-found')
const UserNotFoundError = require('./user-not-found')
const MissingAuthParamError = require('./missing-auth-param')
const InvalidLoginError = require('./invalid-login')

module.exports = {
  BaseError,
  EventNotFoundError,
  UserNotFoundError,
  AuthorizationHeaderMissingError,
  MalformedAuthorizationHeaderError,
  MalformedJwtError,
  MissingJwtError,
  MissingAuthParamError,
  InvalidLoginError
}
