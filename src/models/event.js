const mongoose = require('mongoose')
const moment = require('moment')

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
    // required: true?
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true })

schema.virtual('diff')

schema.methods.diffForUser = function(user) {
  const diff = {
    value: moment(this.date).diff(moment(), user.preferredMeasurementUnit),
    unit: user.preferredMeasurementUnit
  }
  return diff
}

const model = mongoose.model('Event', schema)

module.exports = {
  schema,
  model
}
