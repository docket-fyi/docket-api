const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')
const logger = require('../config/logger')

class Translation extends Model {}

async function init() {
  logger.info('Initializing Translation model...')
  Translation.init({
    key: {
      type: DataTypes.STRING,
      required: true
    },
    text: {
      type: DataTypes.STRING,
      required: true
    }
  }, {
    sequelize: await sequelize.getInstance(),
    modelName: 'translation',
    timestamps: true,
    paranoid: true,
    tableName: 'translations'
  })
  logger.info('Initialized Translation model.')
  return Translation
}

module.exports = {
  init
}
