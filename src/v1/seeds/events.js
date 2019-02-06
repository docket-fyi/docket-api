/* eslint-disable no-console */

const { Event } = require('../../models')

const events = [
  {
    name: '',
    date: '',
    userId: '',
    slug: ''
  }
]

function run() {
  console.log(`Seeding ${events.length} events...`)
  return Event.create(events)
}

module.exports = {
  run
}
