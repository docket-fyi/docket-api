const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class Translation extends Model {}

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
  sequelize,
  modelName: 'translation',
  timestamps: true,
  paranoid: true,
  tableName: 'translations'
})

module.exports = Translation
