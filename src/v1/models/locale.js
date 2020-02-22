const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')
const logger = require('../config/logger')

class Locale extends Model {}

async function init() {
  logger.info('Initializing Locale model...')
  Locale.init({
    code: {
      type: DataTypes.STRING,
      required: true
    },
    name: {
      type: DataTypes.STRING,
      required: true
    }
  }, {
    sequelize: await sequelize.getInstance(),
    modelName: 'locale',
    timestamps: true,
    paranoid: true,
    tableName: 'locales'
  })
  logger.info('Initialized Locale model.')
  return Locale
}

module.exports = {
  init
}
