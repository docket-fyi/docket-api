const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class GoogleCredential extends Model {}

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
  sequelize,
  modelName: 'googleCredential',
  timestamps: true,
  paranoid: true,
  tableName: 'google_credentials'
})

module.exports = GoogleCredential
