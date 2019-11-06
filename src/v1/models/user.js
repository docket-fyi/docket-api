const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    required: true
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  passwordDigest: {
    type: DataTypes.STRING,
    required: false
  },
  preferredMeasurementUnit: {
    type: DataTypes.ENUM('ms', 's', 'm', 'h', 'd', 'w', 'M', 'y'),
    default: 'd'
  },
  confirmedAt: {
    type: DataTypes.DATE
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    default: false
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  paranoid: true,
  tableName: 'users'
})

module.exports = User
