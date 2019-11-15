const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class Event extends Model {

  // diffForUser(user) {
  //   const unit = user.preferredMeasurementUnit || 'days'
  //   const diff = {
  //     value: moment(this.date).diff(moment(), unit),
  //     unit
  //   }
  //   return diff
  // }

}

Event.init({
  uuid: {
    type: DataTypes.UUID,
    required: true
  },
  name: {
    type: DataTypes.STRING,
    required: true
  },
  slug: {
    type: DataTypes.STRING,
    required: true
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
