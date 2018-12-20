const mongoose = require('mongoose')

const eventSchema = require('./event').schema

const schema = new mongoose.Schema({
  events: [eventSchema]
}, { timestamps: true })

const model = mongoose.model('Device', schema)

module.exports = {
  schema,
  model
}
