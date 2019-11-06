// /**
//  * This file was originally generated as output from `npx sequelize init`
//  */

// const fs = require('fs')
// const path = require('path')
// const Sequelize = require('sequelize')
// const sequelize = require('../config/sequelize')

// const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || 'development'
// const config = require(`${__dirname}/../config/sequelize-cli.js`)[env]
// const db = {}

// // let sequelize // eslint-disable-line init-declarations
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_env_variable], config)
// // } else {
// //   sequelize = new Sequelize(config.database, config.username, config.password, config)
// // }
// fs // eslint-disable-line no-sync
//   .readdirSync(__dirname) // eslint-disable-line dot-location
//   .filter(file => { // eslint-disable-line dot-location, arrow-body-style
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//   .forEach(file => { // eslint-disable-line dot-location
//     // const model = sequelize['import'](path.join(__dirname, file)) // eslint-disable-line dot-notation
//     const model = require(path.join(__dirname, file))
//     db[model.name] = model
//   })

// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db)
// //   }
// // })


// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db

const User = require('./user')
const Event = require('./event')
const Locale = require('./locale')
const Translation = require('./translation')
const GoogleCredential = require('./google-credential')
const MicrosoftCredential = require('./microsoft-credential')

Event.belongsTo(User)
User.hasMany(Event)
User.hasOne(GoogleCredential)
User.hasOne(MicrosoftCredential)
GoogleCredential.belongsTo(User)
MicrosoftCredential.belongsTo(User)
Locale.hasMany(Translation)
Translation.belongsTo(Locale)

module.exports = {
  User,
  Event,
  Locale,
  Translation,
  GoogleCredential,
  MicrosoftCredential
}
