const Joi = require('@hapi/joi')

// function buildUsefulErrorObject(errors) {
//   return errors.map(error => {
//     const path = error.path.join('.')
//     const { type, message } = error
//     return {
//       type,
//       code: `error.${path}.${type}`,
//       message,
//       path
//     }
//   })
// }

const validations = {
  '/sessions': {
    post: (req, res, next) => {
      const { body } = req
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          type: Joi.string(),
          attributes: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
          })
        })
      })
      const options = {
        // abortEarly: false
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        // const usefulErrors = buildUsefulErrorObject(bodyValidation.error.details)
        // return next(usefulErrors)
        return next(bodyValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
