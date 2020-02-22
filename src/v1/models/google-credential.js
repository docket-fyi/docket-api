const { Model, DataTypes } = require('sequelize')

const logger = require('../config/logger')
const sequelize = require('../config/sequelize')

class GoogleCredential extends Model {}

async function init() {
  logger.info('Initializing GoogleCredential model...')
  GoogleCredential.init({
    accessToken: {
      type: DataTypes.STRING
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    expiryDate: {
      type: DataTypes.INTEGER
    },
    scope: {
      type: DataTypes.STRING
    },
    tokenType: {
      type: DataTypes.STRING
    }
  }, {
    sequelize: await sequelize.getInstance(),
    modelName: 'googleCredential',
    timestamps: true,
    paranoid: true,
    tableName: 'google_credentials'
  })
  logger.info('Initialized GoogleCredential model.')
  return GoogleCredential
}

module.exports = {
  init
}
