const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  }
})

const Event = mongoose.model('Event', schema)

module.exports = Event
