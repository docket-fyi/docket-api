const stripe = require('stripe')

const environment = require('../environment')

const stripeClient = stripe(environment.stripe.secretKey)

module.exports = stripeClient
