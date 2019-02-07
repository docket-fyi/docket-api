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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferredMeasurementUnit: {
    type: String,
    enum: ['ms', 's', 'm', 'h', 'd', 'w', 'M', 'y'],
    default: 'd'
  },
  confirmedAt: {
    type: Date
  },
  tokens: {
    access_token: {
      type: String,
      required: true
    },
    refresh_token: {
      type: String
    },
    expiry_date: {
      type: Number,
      required: true
    },
    scope: {
     type: String,
     required: true
    },
    token_type: {
      type: String,
      required: true
    }
  }
}, { timestamps: true })

const model = mongoose.model('User', schema)

module.exports = {
  schema,
  model
}
