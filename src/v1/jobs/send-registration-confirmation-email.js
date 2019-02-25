const url = require('url')
const jsonWebToken = require('jsonwebtoken')

const nodemailer = require('../config/nodemailer')
const environment = require('../environment')
const {
  RegistrationConfirmationMissingUserError,
  RegistrationConfirmationInvalidUserError
} = require('../errors')

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
      throw new RegistrationConfirmationMissingUserError()
    }
    if (!user.email || !user.firstName || !user.lastName) {
      throw new RegistrationConfirmationInvalidUserError()
    }
    const options = {
      expiresIn: expiration
    }
    const payload = {
      id: user._id
    }
    const jwt = jsonWebToken.sign(payload, secret, options)
    const { protocol, host } = url.parse(referrer)
    const uiUrl = `${protocol}//${host}`
    const emailData = {
      from,
      to: user.email,
      subject: `Docket registration confirmation`,
      text: `Hi ${user.firstName},\n\n${url}/users/confirm/${jwt}`,
      html: `<html><head></head><body>Hi ${user.firstName},\n\n<a href="${uiUrl}/users/confirm/${jwt}">Confirm</a></body></html>`
    }
    const info = await nodemailer.sendMail(emailData)
    return info
  } catch (err) {
    throw err // Something else (probably a controller) should catch this
  }
}

module.exports = sendRegistrationConfirmationEmail
