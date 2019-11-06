const Joi = require('joi')

const validations = {
  '/my/profile': {
    put: (req, res, next) => {
      const { query } = req
      const schema = {
        query: Joi.object(),
        params: Joi.object(),
        body: Joi.object(),
      }
      const options = {}
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  },
  '/my/events': {
    post: (req, res, next) => {
      const { query } = req
      const schema = {
        query: Joi.object(),
        params: Joi.object(),
        body: Joi.object(),
      }
      const options = {}
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  },
  '/my/events/import': {
    post: (req, res, next) => {
      const { query } = req
      const schema = {
        query: Joi.object(),
        params: Joi.object(),
        body: Joi.object(),
      }
      const options = {}
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  },
  '/my/events/:eventId': {
    put: (req, res, next) => {
      const { query } = req
      const schema = {
        query: Joi.object(),
        params: Joi.object(),
        body: Joi.object(),
      }
      const options = {}
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
