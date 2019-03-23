/* eslint-disable max-lines */

const status = require('http-status')
const qs = require('qs')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url');

const environment = require('../environment')
const microsoft = require('../microsoft')
// const { MicrosoftOAuthMissingAuthorizationCodeError } = require('../errors')

/**
 * Returns the OAuth2 URL for Microsoft services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getOAuthUrl(req, res, next) {
  try {
    const { applicationId, tokenHost, authorizePath, redirectUrl, scopes } = environment.microsoft
    const queryParams = {
      redirect_uri: redirectUrl,
      response_type: 'code',
      scope: scopes().join(' '),
      client_id: applicationId
    }
    const url = `${tokenHost}/${authorizePath}?${qs.stringify(queryParams)}`
    res.status(status.OK).json({ url })
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns the OAuth2 URL for Microsoft services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getAccessTokens(req, res, next) {
  try {
    const { query, currentUser } = req
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      // @todo throw new MicrosoftOAuthMissingAuthorizationCodeError()
      throw new Error('MicrosoftOAuthMissingAuthorizationCodeError')
    }
    const { applicationId, applicationPassword, tokenHost, tokenPath, redirectUrl, scopes } = environment.microsoft
    const url = `${tokenHost}/${tokenPath}`
    const body = new URLSearchParams({
      client_id: applicationId,
      scope: scopes().join(' '),
      redirect_uri: redirectUrl,
      grant_type: 'authorization_code',
      client_secret: applicationPassword,
      code
    })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
    const response = await fetch(url, options)
    const microsoft = await response.json()
    await currentUser.update({microsoft})
    res.status(status.NO_CONTENT).send()
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * [getAllCalendarListsWithEvents description]
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getAllCalendarListsWithEvents(req, res, next) {
  try {
    const { currentUser } = req
    const accessToken = currentUser.microsoft.access_token
    if (!accessToken) throw new Error()
    const listCalendarsResponse = await microsoft.users.calendar.listCalendars(accessToken)
    const calendarsJson = await listCalendarsResponse.json()
    const calendars = calendarsJson.value
    for (const calendar of calendars) {
      const listEventsResponse = await microsoft.users.calendarView.list(calendar.id, accessToken) // eslint-disable-line no-await-in-loop
      const listEventsJson = await listEventsResponse.json() // eslint-disable-line no-await-in-loop
      calendar.events = listEventsJson.value
    }
    res.status(status.OK).json(calendars)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * [getAllEvents description]
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getAllEvents(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}


module.exports = {
  getOAuthUrl,
  getAccessTokens,
  getAllCalendarListsWithEvents,
  getAllEvents,
}
