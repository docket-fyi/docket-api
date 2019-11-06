const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class MicrosoftCredential extends Model {}

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
  sequelize,
  modelName: 'microsoftCredential',
  timestamps: true,
  paranoid: true,
  tableName: 'microsoft_credentials'
})

module.exports = MicrosoftCredential
