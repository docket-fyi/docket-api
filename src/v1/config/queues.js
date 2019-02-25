const Queue = require('bull')

const environment = require('../environment')

const { redis } = environment
const { protocol, host, port/*, username, password*/ } = redis
const queueNames = {
  SEND_PASSWORD_RESET_EMAIL: 'sendPasswordResetEmail',
  SEND_REGISTRATION_CONFIRMATION_EMAIL: 'sendRegistrationConfirmationEmail'
}
const url = `${protocol}${host}:${port}`
const opts = {}

/*
{
  sendPasswordResetEmailQueue: Queue('sendPasswordResetEmail'),
  sendRegistrationConfirmationEmailQueue: Queue('sendRegistrationConfirmationEmail')
}
*/
const queues = Object.keys(queueNames)
                     .reduce( // eslint-disable-line dot-location
                       (acc, curr) => {
                        const queueName = queueNames[curr]
                        // @see https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queue
                        acc[`${queueName}Queue`] = Queue(queueName, url, opts)
                        return acc
                      },
                      {}
                    )

module.exports = queues
