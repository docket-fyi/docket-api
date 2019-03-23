const mongoose = require('mongoose')
const moment = require('moment')

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
    required: true,
    select: false
  },
  preferredMeasurementUnit: {
    type: String,
    enum: ['ms', 's', 'm', 'h', 'd', 'w', 'M', 'y'],
    default: 'd'
  },
  confirmedAt: {
    type: Date
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  google: {
    access_token: {
      type: String,
      // required: true
      // select: false
    },
    refresh_token: {
      type: String,
      // select: false
    },
    expiry_date: {
      type: Number,
      // required: true
      // select: false
    },
    scope: {
      type: String,
      //  required: true
      // select: false
    },
    token_type: {
      type: String,
      // required: true
      // select: false
    }
  },
  microsoft: {
    access_token: {
      type: String,
      // required: true
      // select: false
    },
    refresh_token: {
      type: String,
      // select: false
    },
    expires_in: {
      type: Number,
      // required: true
      // select: false
    },
    scope: {
      type: String,
      //  required: true
      // select: false
    },
    token_type: {
      type: String,
      // required: true
      // select: false
    },
    id_token: {
      type: String,
      // required: true
      // select: false
    }
  }
}, { timestamps: true })

schema.methods.eventDiff = function(event) {
  const diff = {
    value: moment(event.date).diff(moment(), this.preferredMeasurementUnit),
    unit: this.preferredMeasurementUnit
  }
  return diff
}

const model = mongoose.model('User', schema)

module.exports = {
  schema,
  model
}
