const Joi = require('@hapi/joi')

const validations = {
  '/users': {
    post: (req, res, next) => {
      const { body } = req
      const schema = {
        body: Joi.object().keys({
          data: Joi.object().keys({
            attributes: Joi.object().keys({
              email: Joi.string().email().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string()
            })
          })
        })
      }
      const options = {
        // abortEarly: false
      }
      let bodyValidation = Joi.validate(body, schema.body, options)
      if (bodyValidation.error) {
        // const usefulErrors = buildUsefulErrorObject(bodyValidation.error.details)
        // return next(usefulErrors)
        return next(bodyValidation.error)
      }
      return next()
    }
  },
  '/users/confirm-registration': {
    post: (req, res, next) => {
      const { body, query } = req
      const schema = {
        query: Joi.object().keys({
          code: Joi.string().required()
        }),
        body: Joi.object().keys({
          data: Joi.object().keys({
            attributes: Joi.object().keys({
              password: Joi.string().required(),
              passwordConfirmation: Joi.string().required()
            })
          })
        })
      }
      const options = {
        // abortEarly: false
      }
      let bodyValidation = Joi.validate(body, schema.body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  },
  '/users/forgot-password': {
    post: (req, res, next) => {
      const { body } = req
      const schema = {
        body: Joi.object().keys({
          data: Joi.object().keys({
            attributes: Joi.object().keys({
              email: Joi.string().email().required()
            })
          })
        })
      }
      const options = {
        // abortEarly: false
      }
      let bodyValidation = Joi.validate(body, schema.body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      return next()
    }
  },
  '/users/reset-password': {
    post: (req, res, next) => {
      const { body, query } = req
      const schema = {
        query: Joi.object().keys({
          code: Joi.string().required()
        }),
        body: Joi.object().keys({
          data: Joi.object().keys({
            attributes: Joi.object().keys({
              password: Joi.string().required(),
              passwordConfirmation: Joi.string().required()
            })
          })
        })
      }
      const options = {
        // abortEarly: false
      }
      let bodyValidation = Joi.validate(body, schema.body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
