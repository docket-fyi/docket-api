const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = require('./definition')


const options = {
  swaggerDefinition,
  apis: [
    'src/v1/controllers/**/*.js',
    'src/v1/swagger/**/*.yml'
  ]
}

const spec = swaggerJSDoc(options)

module.exports = {
  spec
}
