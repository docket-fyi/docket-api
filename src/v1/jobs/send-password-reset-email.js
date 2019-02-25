const url = require('url')
const jsonWebToken = require('jsonwebtoken')

const nodemailer = require('../config/nodemailer')
const environment = require('../environment')
const {
  PasswordResetEmailUserMissingError,
  PasswordResetEmailInvalidUserError
} = require('../errors')

const { from, secret, expiration } = environment.passwordReset

/**
 * [sendRegistrationConfirmation description]
 *
 * @param {Object} data
 * @param {String} data.referrer The incoming request object
 * @param {User} data.newUser An instance of the User model
 *
 * @return  {Promise<undefined>}
 */
async function sendPasswordResetEmail(job) {
  try {
    const { referrer, user } = job.data
    if (!user) {
      throw new PasswordResetEmailUserMissingError()
    }
    if (!user.email || !user.firstName || !user.lastName) {
      throw new PasswordResetEmailInvalidUserError()
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
      subject: `Docket password reset`,
      text: `Hi ${user.firstName},\n\n${url}/reset-password/${jwt}`,
      html: `<html><head></head><body>Hi ${user.firstName},\n\n<a href="${uiUrl}/reset-password/${jwt}">Reset password</a></body></html>`
    }
    const info = await nodemailer.sendMail(emailData)
    return info
  } catch (err) {
    throw err // Something else (probably a controller) should catch this
  }
}

module.exports = sendPasswordResetEmail
