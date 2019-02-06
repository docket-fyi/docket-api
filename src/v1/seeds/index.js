/* eslint-disable no-console, no-warning-comments */

// const environment = require('../environment')
const locales = require('./locales')
const users = require('./users')

// TODO: if (environment.name !== 'development') { ... }

require('../config/db')

const seeders = [
  locales,
  users
]

function allSeeders() {
  const promises = []
  seeders.forEach(seeder => {
    if (!seeder.run || typeof seeder.run !== 'function') throw new Error('Seeder must export a \'run\' method')
    promises.push(seeder.run())
  })
  return promises
}

async function run() {
  const promises = allSeeders()
  try {
    await Promise.all(promises)
    console.log('Done.')
    process.exit(0)
  } catch (err) {
    throw err
  }
}

run()
