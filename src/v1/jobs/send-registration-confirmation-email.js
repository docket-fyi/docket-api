const url = require('url')
const jsonWebToken = require('jsonwebtoken')

const nodemailer = require('../config/nodemailer')
const environment = require('../environment')
const errors = require('../errors')

const { from, secret, expiration } = environment.registrationConfirmation

/**
 * [sendRegistrationConfirmation description]
 *
 * @param {Object} data
 * @param {String} data.referrer
 * @param {User} data.user An instance of the User model
 *
 * @return  {undefined}
 */
async function sendRegistrationConfirmationEmail(job) {
  try {
    const { referrer, user } = job.data
    if (!user) {
      throw new errors.users.RegistrationConfirmationEmailMissingUserError()
    }
    if (!user.email || !user.firstName) {
      throw new errors.users.RegistrationConfirmationEmailInvalidUserError()
    }
    const options = {
      expiresIn: expiration
    }
    const payload = {
      id: user.id
    }
    const jwt = jsonWebToken.sign(payload, secret, options)
    const { protocol, host } = url.parse(referrer)
    const uiUrl = `${protocol}//${host}`
    const emailData = {
      from,
      to: user.email,
      subject: `Docket registration confirmation`,
      text: `Hi ${user.firstName},\n\nConfirm registration:\n\n${uiUrl}/confirm-registration?code=${jwt}`,
      html: `<html><head></head><body>Hi ${user.firstName},<br><br><a href="${uiUrl}/confirm-registration?code=${jwt}">Confirm Registration</a></body></html>`
    }
    const info = await nodemailer.sendMail(emailData)
    return info
  } catch (err) {
    throw err // Something else (probably a controller) should catch this
  }
}

module.exports = sendRegistrationConfirmationEmail
