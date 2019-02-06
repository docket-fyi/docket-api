const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

const model = mongoose.model('Translation', schema)

module.exports = {
  schema,
  model
}
