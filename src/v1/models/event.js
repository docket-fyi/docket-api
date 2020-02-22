const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')
const logger = require('../config/logger')

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

async function init() {
  logger.info('Initializing Event model...')
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
    sequelize: await sequelize.getInstance(),
    modelName: 'event',
    timestamps: true,
    paranoid: true,
    tableName: 'events'
  })
  logger.info('Initialized Event model.')
  return Event
}

module.exports = {
  init
}
