/* eslint-disable arrow-body-style */

const TABLE_NAME = 'locales'

module.exports = {

  up: queryInterface/*, Sequelize*/ => {
    return queryInterface.bulkInsert(TABLE_NAME, [], {})
  },

  down: queryInterface/*, Sequelize*/ => {
    return queryInterface.bulkDelete(TABLE_NAME, null, {})
  }

}
