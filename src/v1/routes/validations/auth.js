const Joi = require('joi')

function buildUsefulErrorObject(details) {
  const usefulErrors = {};
  details.forEach(detail => {
    const id = detail.path.join('_')
    if (!usefulErrors.hasOwnProperty(id)) { // eslint-disable-line no-prototype-builtins
      usefulErrors[id] = {
        type: detail.type,
        msg: `error.${detail.path.join('_')}.${detail.type}`
      }
    }
  })
  return usefulErrors
}

const validations = {
  '/auth': {
    post: (req, res, next) => {
      const { body } = req
      const schema = {
        body: Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
      const options = {
        abortEarly: false
      }
      const { error } = Joi.validate(body, schema.body, options)
      if (error) {
        buildUsefulErrorObject(error.details)
        return next(error)
      }
      return next()
    }
  }
}

module.exports = validations
