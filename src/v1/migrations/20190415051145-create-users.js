/* eslint-disable arrow-body-style */

const TABLE_NAME = 'users'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      passwordDigest: {
        allowNull: true,
        type: Sequelize.STRING
      },
      preferredMeasurementUnit: {
        type: Sequelize.STRING
      },
      isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // googleCredentialId: {}
      confirmedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },

  down: queryInterface/*, Sequelize*/ => {
    return queryInterface.dropTable(TABLE_NAME)
  }

}
