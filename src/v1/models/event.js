const { Model, DataTypes } = require('sequelize')
const moment = require('moment')

const sequelize = require('../config/sequelize')

class Event extends Model {

  diffForUser(user) {
    const diff = {
      value: moment(this.date).diff(moment(), user.preferredMeasurementUnit),
      unit: user.preferredMeasurementUnit
    }
    return diff
  }

}

Event.init({
  name: {
    type: DataTypes.STRING,
    required: true
  },
  slug: {
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  date: {
    type: DataTypes.DATE,
    required: true
  }
}, {
  sequelize,
  modelName: 'event',
  timestamps: true,
  paranoid: true,
  tableName: 'events'
})

module.exports = Event
