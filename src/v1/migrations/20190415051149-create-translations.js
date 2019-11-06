/* eslint-disable arrow-body-style */

const TABLE_NAME = 'translations'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING,
        required: true
      },
      localeId: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
          model: 'locales',
          key: 'id'
        }
      },
      text: {
        type: Sequelize.STRING,
        required: true
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
    }).then(() => {
      queryInterface.addConstraint(TABLE_NAME, ['key', 'localeId'], {
        type: 'unique'
        // name: 'translations_key_localeid' // The name the Sequelize auto-generates is too long
      })
    })
  },

  down: queryInterface/*, Sequelize*/ => {
    return queryInterface.dropTable(TABLE_NAME)
  }

}
