/* eslint-disable arrow-body-style, max-lines */

const { Locale, Translation } = require('../models')

const TABLE_NAME = 'translations'

module.exports = {

  up: async (/*queryInterface, Sequelize*/) => {
    const locales = await Locale.findAll()
    // return queryInterface.bulkInsert(TABLE_NAME, [
    return Translation.bulkCreate([
      {
        key: 'login',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'login'
      },
      {
        key: 'back',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'back'
      },
      {
        key: 'forgotPassword',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'forgot password'
      },
      {
        key: 'submit',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'submit'
      },
      {
        key: 'name',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'name'
      },
      {
        key: 'date',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'date'
      },
      {
        key: 'delete',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'delete'
      },
      {
        key: 'destroy',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'destroy'
      },
      {
        key: 'remove',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'remove'
      },
      {
        key: 'search',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'search'
      },
      {
        key: 'profile',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'profile'
      },
      {
        key: 'myProfile',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'my profile'
      },
      {
        key: 'logout',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'logout'
      },
      {
        key: 'firstName',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'first name'
      },
      {
        key: 'lastName',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'last name'
      },
      {
        key: 'email',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'email'
      },
      {
        key: 'password',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'password'
      },
      {
        key: 'passwordConfirmation',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'password confirmation'
      },
      {
        key: 'confirmRegistration',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'confirm registration'
      },
      {
        key: 'registrationConfirmation',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'registration confirmation'
      },
      {
        key: 'thanksForRegistering',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'thanks for registering, {{firstName}}. please check your email to confirm your account.'
      },
      {
        key: 'thanksForConfirming',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'thanks for confirming, {{firstName}}. you can now login.'
      },
      {
        key: 'register',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'register'
      },
      {
        key: 'signUp',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'sign up'
      },
      {
        key: 'loading',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'loading'
      },
      {
        key: 'loadingEllipsis',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'loading...'
      },
      {
        key: 'privacyPolicy',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'privacy policy'
      },
      {
        key: 'termsOfUse',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'terms of use'
      },
      {
        key: 'forgot',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'forgot?'
      },
      {
        key: 'anUnknownErrorOccurred',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'an unknown error occurred'
      },
      {
        key: 'forgotPasswordCheckEmail',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'please check your email for instructions on resetting your password.'
      },
      {
        key: 'userNotFound',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'user not found'
      },
      {
        key: 'userNotConfirmed',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'user not confirmed'
      },
      {
        key: 'searchEllipsis',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'search...'
      },
      {
        key: 'upgrade',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'upgrade'
      },
      {
        key: 'newEvent',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'new event'
      },
      {
        key: 'welcomeBack',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'welcome back, {{firstName}}'
      },
      {
        key: 'event',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'event'
      },
      {
        key: 'events',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'events'
      },
      {
        key: 'account',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'account'
      },
      {
        key: 'myAccount',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'my account'
      },
      {
        key: 'accountSettings',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'account settings'
      },
      {
        key: 'notification',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'notification'
      },
      {
        key: 'notifications',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'notifications'
      },
      {
        key: 'passwordHelperText',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'must be between 6 and 20 characters'
      },
      {
        key: 'preferredMeasurementUnit',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'preferred measurement unit'
      },
      {
        key: 'second',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'second'
      },
      {
        key: 'seconds',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'seconds'
      },
      {
        key: 'minute',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'minute'
      },
      {
        key: 'minutes',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'minutes'
      },
      {
        key: 'hour',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'hour'
      },
      {
        key: 'hours',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'hours'
      },
      {
        key: 'day',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'day'
      },
      {
        key: 'days',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'days'
      },
      {
        key: 'week',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'week'
      },
      {
        key: 'weeks',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'weeks'
      },
      {
        key: 'month',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'month'
      },
      {
        key: 'months',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'months'
      },
      {
        key: 'year',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'year'
      },
      {
        key: 'years',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'years'
      },
      {
        key: 'memberSince',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'member since'
      },
      {
        key: 'registerUsingYourThirdPartyAccount',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'register using your {{thirdPartyName}} account'
      },
      {
        key: 'signUpUsingYourThirdPartyAccount',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'sign up using your {{thirdPartyName}} account'
      },
      {
        key: 'loginUsingYourThirdPartyAccount',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'login using your {{thirdPartyName}} account'
      },
      {
        key: 'registerUsingThirdParty',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'register using {{thirdPartyName}}'
      },
      {
        key: 'signUpUsingThirdParty',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'sign up using {{thirdPartyName}}'
      },
      {
        key: 'loginUsingThirdParty',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'login using {{thirdPartyName}}'
      },
      {
        key: 'noAccountSignUp',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'no account? sign up'
      },
      {
        key: 'noAccountRegister',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'no account? register'
      },
      {
        key: 'noAccount',
        localeId: locales.find(locale => locale.code === 'en-US').id,
        text: 'no account?'
      },
    ],
    {
      validate: true,
      individualHooks: true
    })
  },

  down: queryInterface/*, Sequelize*/ => {
    return queryInterface.bulkDelete(TABLE_NAME, null, {})
  }

}
