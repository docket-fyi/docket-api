const mongoose = require('mongoose')

// const eventSchema = require('./event')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  events: [],
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  }
})

const Device = mongoose.model('Device', schema)

module.exports = Device
