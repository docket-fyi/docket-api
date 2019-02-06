/* eslint-disable no-console */

const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const PASSWORD = 'Abc123123!'
const hashedPassword = bcrypt.hashSync(PASSWORD, 10) // eslint-disable-line no-sync

const users = [
  {
    firstName: 'Admin',
    lastName: 'Istrator',
    email: 'j7w5veinmrorl7op@ethereal.email',
    password: hashedPassword,
    preferredMeasurementUnit: 'd'
  }
]

function run() {
  console.log(`Seeding ${users.length} users...`)
  return User.create(users)
}

module.exports = {
  run
}
