const AuthorizationHeaderMissingError = require('./authorization-header-missing')
const BaseError = require('./base')
const EventNotFoundError = require('./event-not-found')
const ForgotPasswordEmailMissingError = require('./forgot-password-email-missing')
const InvalidLoginError = require('./invalid-login')
const MalformedAuthorizationHeaderError = require('./malformed-authorization-header')
const MalformedJwtError = require('./malformed-jwt')
const MissingAuthParamError = require('./missing-auth-param')
const MissingJwtError = require('./missing-jwt')
const PasswordResetEmailInvalidUserError = require('./password-reset-email-invalid-user')
const PasswordResetEmailMissingUserError = require('./password-reset-email-missing-user')
const PasswordResetMismatchError = require('./password-reset-mismatch')
const PasswordResetMissingCodeError = require('./password-reset-missing-code')
const PasswordResetMissingPasswordError = require('./password-reset-missing-password')
const PasswordResetSamePasswordError = require('./password-reset-same-password')
const RegistrationConfirmationCodeMissingError = require('./registration-confirmation-code-missing')
const RegistrationConfirmationInvalidUserError = require('./registration-confirmation-email-invalid-user')
const RegistrationConfirmationMissingUserError = require('./registration-confirmation-email-missing-user')
const UserAlreadyConfirmedError = require('./user-already-confirmed')
const UserNotConfirmedError = require('./user-not-confirmed')
const UserNotFoundError = require('./user-not-found')

module.exports = {
  AuthorizationHeaderMissingError,
  BaseError,
  EventNotFoundError,
  ForgotPasswordEmailMissingError,
  InvalidLoginError,
  MalformedAuthorizationHeaderError,
  MalformedJwtError,
  MissingAuthParamError,
  MissingJwtError,
  PasswordResetEmailInvalidUserError,
  PasswordResetEmailMissingUserError,
  PasswordResetMismatchError,
  PasswordResetMissingCodeError,
  PasswordResetMissingPasswordError,
  PasswordResetSamePasswordError,
  RegistrationConfirmationCodeMissingError,
  RegistrationConfirmationInvalidUserError,
  RegistrationConfirmationMissingUserError,
  UserAlreadyConfirmedError,
  UserNotConfirmedError,
  UserNotFoundError
}
