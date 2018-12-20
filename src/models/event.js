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
  }
}, { timestamps: true })

const model = mongoose.model('Event', schema)

module.exports = {
  schema,
  model
}
