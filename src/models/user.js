const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  preferredMeasurementUnit: {
    type: String,
    enum: ['ms', 's', 'm', 'h', 'd', 'w', 'M', 'y'],
    default: 'd'
  }
}, { timestamps: true })

const model = mongoose.model('User', schema)

module.exports = {
  schema,
  model
}
