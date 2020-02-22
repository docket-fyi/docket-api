const logger = require('../config/logger')
const userModelDefinition = require('./user')
const eventModelDefinition = require('./event')
const localeModelDefinition = require('./locale')
const translationModelDefinition = require('./translation')
const googleCredentialModelDefinition = require('./google-credential')
const microsoftCredentialModelDefinition = require('./microsoft-credential')

let User = null
let Event = null
let Locale = null
let Translation = null
let GoogleCredential = null
let MicrosoftCredential = null

async function init() {
  logger.info('Initializing models...')
  const [
    userModel,
    eventModel,
    localeModel,
    translationModel,
    googleCredentialModel,
    microsoftCredentialModel
  ] = await Promise.all([
    userModelDefinition.init(),
    eventModelDefinition.init(),
    localeModelDefinition.init(),
    translationModelDefinition.init(),
    googleCredentialModelDefinition.init(),
    microsoftCredentialModelDefinition.init()
  ])
  eventModel.belongsTo(userModel)
  userModel.hasMany(eventModel)
  userModel.hasOne(googleCredentialModel)
  userModel.hasOne(microsoftCredentialModel)
  googleCredentialModel.belongsTo(userModel)
  microsoftCredentialModel.belongsTo(userModel)
  localeModel.hasMany(translationModel)
  translationModel.belongsTo(localeModel)

  User = userModel
  Event = eventModel
  Locale = localeModel
  Translation = translationModel
  GoogleCredential = googleCredentialModel
  MicrosoftCredential = microsoftCredentialModel
  logger.info('Initialized models.')
}

async function getUserModel() {
  if (!User) {
    // User = await userModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return User
}

async function getEventModel() {
  if (!Event) {
    // Event = await eventModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return Event
}

async function getLocaleModel() {
  if (!Locale) {
    // Locale = await localeModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return Locale
}

async function getTranslationModel() {
  if (!Translation) {
    // Translation = await translationModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return Translation
}

async function getGoogleCredentialModel() {
  if (!GoogleCredential) {
    // GoogleCredential = await googleCredentialModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return GoogleCredential
}

async function getMicrosoftCredentialModel() {
  if (!MicrosoftCredential) {
    // MicrosoftCredential = await microsoftCredentialModelDefinition.init() // eslint-disable-line require-atomic-updates
    await init() // eslint-disable-line require-atomic-updates
  }
  return MicrosoftCredential
}

module.exports = {
  init,
  getUserModel,
  getEventModel,
  getLocaleModel,
  getTranslationModel,
  getGoogleCredentialModel,
  getMicrosoftCredentialModel
}
