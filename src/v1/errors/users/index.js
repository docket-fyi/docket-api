const NotFoundError = require('./not-found')
const NotConfirmedError = require('./not-confirmed')
const AlreadyConfirmedError = require('./already-confirmed')
const ForgotPasswordEmailMissingError = require('./forgot-password-email-missing')
const PasswordResetEmailInvalidUserError = require('./password-reset-email-invalid-user')
const PasswordResetEmailMissingUserError = require('./password-reset-email-missing-user')
const PasswordResetMismatchError = require('./password-reset-mismatch')
const PasswordResetMissingCodeError = require('./password-reset-missing-code')
const PasswordResetMissingPasswordError = require('./password-reset-missing-password')
const PasswordResetSamePasswordError = require('./password-reset-same-password')
const RegistrationConfirmationCodeMissingError = require('./registration-confirmation-code-missing')
const RegistrationConfirmationEmailInvalidUserError = require('./registration-confirmation-email-invalid-user')
const RegistrationConfirmationEmailMissingUserError = require('./registration-confirmation-email-missing-user')

module.exports = {
  NotFoundError,
  NotConfirmedError,
  AlreadyConfirmedError,
  ForgotPasswordEmailMissingError,
  PasswordResetEmailInvalidUserError,
  PasswordResetEmailMissingUserError,
  PasswordResetMismatchError,
  PasswordResetMissingCodeError,
  PasswordResetMissingPasswordError,
  PasswordResetSamePasswordError,
  RegistrationConfirmationCodeMissingError,
  RegistrationConfirmationEmailInvalidUserError,
  RegistrationConfirmationEmailMissingUserError
}
