const Joi = require('joi')

const validations = {
  '/devices/:deviceId': {
    get: (req, res, next) => {
      const { params, query, body } = req
      const schema = {
        params: {},
        query: {},
        body: {}
      }
      Joi.validate(params, schema.params)
      Joi.validate(query, schema.query)
      Joi.validate(body, schema.body)

      Joi.validate(req, schema)
      next()
    },
    put: (req, res, next) => {
      next()
    },
    delete: (req, res, next) => {
      next()
    }
  },
  '/devices': {
    post: (req, res, next) => {
      next()
    }
  }
}

module.exports = validations
