const nodemailer = require('nodemailer')

const environment = require('../environment')

const { port, host, user, pass } = environment.mail

const options = {
  port,
  host,
  auth: {
    user,
    pass
  },
  secure: false
}
const transporter = nodemailer.createTransport(options)

module.exports = transporter
