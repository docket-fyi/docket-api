const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class Locale extends Model {}

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
  sequelize,
  modelName: 'locale',
  timestamps: true,
  paranoid: true,
  tableName: 'locales'
})

module.exports = Locale
