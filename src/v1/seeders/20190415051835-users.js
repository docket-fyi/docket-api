/* eslint-disable arrow-body-style */

const TABLE_NAME = 'users'

module.exports = {

  up: (/*queryInterface, Sequelize*/) => {
    // return queryInterface.bulkInsert(TABLE_NAME, [], {})
    return Promise.resolve()
  },

  down: queryInterface/*, Sequelize*/ => {
    return queryInterface.bulkDelete(TABLE_NAME, null, {})
  }

}
