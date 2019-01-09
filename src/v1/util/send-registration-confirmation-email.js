const url = require('url')
const jsonWebToken = require('jsonwebtoken')

const nodemailer = require('../config/nodemailer')
const environment = require('../environment')
const {
  RegistrationConfirmationEmailUserMissingError,
  RegistrationConfirmationEmailInvalidUserError
} = require('../errors')

const { from, secret, expiration } = environment.registrationConfirmation

/**
 * [sendRegistrationConfirmation description]
 *
 * @param {Request} req The incoming request object
 * @param {User} user An instance of the User model
 *
 * @return  {undefined}
 */
async function sendRegistrationConfirmationEmail(req, user) {
  try {
    if (!user) {
      throw new RegistrationConfirmationEmailUserMissingError()
    }
    if (!user.email || !user.firstName || !user.lastName) {
      throw new RegistrationConfirmationEmailInvalidUserError()
    }
    const options = {
      expiresIn: expiration
    }
    const payload = {
      id: user.id
    }
    const jwt = jsonWebToken.sign(payload, secret, options)
    const referrer = req.get('Referrer')
    const { protocol, host } = url.parse(referrer)
    const uiUrl = `${protocol}//${host}`
    const data = {
      from,
      to: user.email,
      subject: `Docket registration confirmation`,
      text: `Hi ${user.firstName},\n\n${url}/users/confirm/${jwt}`,
      html: `<html><head></head><body>Hi ${user.firstName},\n\n<a href="${uiUrl}/users/confirm/${jwt}">Confirm</a></body></html>`
    }
    const info = await nodemailer.sendMail(data)
    return info
  } catch (err) {
    throw err // Something else (probably a controller) should catch this
  }
}

module.exports = sendRegistrationConfirmationEmail
