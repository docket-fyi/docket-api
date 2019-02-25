require('./src/v1/environment')
const debug = require('./src/v1/config/debug').worker
const {
  sendRegistrationConfirmationEmailQueue,
  sendPasswordResetEmailQueue
} = require('./src/v1/config/queues')
const {
  sendRegistrationConfirmationEmail,
  sendPasswordResetEmail
} = require('./src/v1/jobs')

debug(`listening`)
sendRegistrationConfirmationEmailQueue.process(sendRegistrationConfirmationEmail)
sendPasswordResetEmailQueue.process(sendPasswordResetEmail)
