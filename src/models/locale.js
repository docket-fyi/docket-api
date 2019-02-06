const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  code: {
    type: String,
    enum: ['en-US'],
    required: true,
    unique: true
  },
  translations: {
    type: Object
  }
}, { timestamps: true })

const model = mongoose.model('Locale', schema)

module.exports = {
  schema,
  model
}
