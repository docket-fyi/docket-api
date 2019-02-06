const debug = require('./debug').mongo
const mongoose = require('mongoose')

const { db } = require('../environment')
const {
  protocol,
  username,
  password,
  host,
  port,
  useSSL,
  name
} = db

const url = `${protocol}${username}:${password}@${host}:${port}/${name}`
const options = {
  ssl: useSSL === 'true',
  useNewUrlParser: true
}
mongoose.set('useCreateIndex', true)
mongoose.connect(url, options, error => {
  if (error) throw error
})
const connection = mongoose.connection

connection.on('error', err => {
  debug('connection error', err)
  process.exit(1)
})
connection.once('open', () => debug('connected'))

module.exports = connection
