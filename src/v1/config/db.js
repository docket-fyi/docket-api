const debug = require('debug')('db:mongo')
const mongoose = require('mongoose')

const environment = require('../environment')

const url = `${environment.db.protocol}${environment.db.username}:${environment.db.password}@${environment.db.url}:${environment.db.port}/${environment.db.name}`
const options = {
  useNewUrlParser: true
}
mongoose.connect(url, options, error => {
  if (error) throw error
})
const db = mongoose.connection

db.on('error', err => {
  debug('connection error', err)
  process.exit(1)
})
db.once('open', () => debug('connected'))

module.exports = db
