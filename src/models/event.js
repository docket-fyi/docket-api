const mongoose = require('mongoose')

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

const model = mongoose.model('Event', schema)

module.exports = {
  schema,
  model
}
