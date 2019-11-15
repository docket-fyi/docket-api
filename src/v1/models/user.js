const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

class User extends Model {

  get initials() {
    return this.lastName
      ? `${this.firstName[0]}${this.lastName[0]}`
      : this.firstName[0]
  }

}

User.init({
  uuid: {
    type: DataTypes.UUID,
    required: true
  },
  firstName: {
    type: DataTypes.STRING,
    required: true
  },
  lastName: {
    type: DataTypes.STRING,
  },
  // initials: {
  //   type: DataTypes.VIRTUAL
  // },
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
