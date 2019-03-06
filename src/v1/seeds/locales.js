/* eslint-disable no-console */

const { Locale } = require('../../models')

const locales = [
  {
    code: 'en-US',
    translations: {
      pleaseLoginToContinue: 'Please login to continue',
      loginExpired: 'Login expired',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot password?',
      date: 'Date',
      delete: 'Delete',
      firstName: 'First name',
      lastName: 'Last name',
      loading: 'Loading...',
      logout: 'Logout',
      memberSince: 'Member since {{date}}',
      name: 'Name',
      passwordConfirmation: 'Password confirmation',
      profile: 'Profile',
      search: 'Search',
      submit: 'Submit',
      userNotConfirmed: 'User not confirmed',
      thanksForRegistering: 'Thanks for registering, {{firstName}}! Please check your email ({{email}}) to confirm your account.',
      preferredMeasurementUnit: 'Preferred measurement unit',
      daysPlural: 'Days',
      weeksPlural: 'Weeks',
      monthsPlural: 'Months',
      yearsPlural: 'Years',
      daySingular: 'Day',
      weekSingular: 'Week',
      monthSingular: 'Month',
      yearSingular: 'Year'
    }
  }
]

function run() {
  console.log(`Seeding ${locales.length} locales...`)
  return Locale.create(locales)
}

module.exports = {
  run
}