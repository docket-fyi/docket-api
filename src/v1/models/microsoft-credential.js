const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')
const logger = require('../config/logger')

class MicrosoftCredential extends Model {}

async function init() {
  logger.info('Initializing MicrosoftCredential model...')
  MicrosoftCredential.init({
    accessToken: {
      type: DataTypes.STRING
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    expiresIn: {
      type: DataTypes.INTEGER
    },
    scope: {
      type: DataTypes.STRING
    },
    tokenType: {
      type: DataTypes.STRING
    },
    idToken: {
      type: DataTypes.STRING
    }
  }, {
    sequelize: await sequelize.getInstance(),
    modelName: 'microsoftCredential',
    timestamps: true,
    paranoid: true,
    tableName: 'microsoft_credentials'
  })
  logger.info('Initialized MicrosoftCredential model.')
  return MicrosoftCredential
}

module.exports = {
  init
}
