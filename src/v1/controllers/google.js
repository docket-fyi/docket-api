/* eslint-disable max-lines, no-warning-comments */

const Sentry = require('@sentry/node')
const status = require('http-status')
const { google } = require('googleapis')
const moment = require('moment')

const environment = require('../environment')
const oauth2Client = require('../config/google')
const errors = require('../errors')
const serializers = require('../serializers')

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/oauth-url:
 *   get:
 *     summary: Get the OAuth2 URL for Google services
 *     description: Get the OAuth2 URL for Google services
 *     operationId: getGoogleOAuthUrl
 *     security: []
 *     tags:
 *       - Google
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GoogleOAuthUrlOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function getOAuthUrl(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'getOAuthUrl')
  })
  try {
    const url = oauth2Client.generateAuthUrl({
      // access_type: 'online|offline',
      scope: environment.google.scopes()
    })
    res.status(status.OK)
    res.body = serializers.google.oauthUrl.serialize({ url })
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/tokens:
 *   get:
 *     summary: Get Google access tokens
 *     description: Get Google access tokens
 *     operationId: googleGetAccessTokens
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleGetAccessTokensCodeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function getAccessTokens(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'getAccessTokens')
  })
  try {
    const { query, currentUser } = req
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new errors.google.OAuthMissingAuthorizationCodeError()
    }
    const { tokens } = await oauth2Client.getToken(code)
    await currentUser.updateOne({google: tokens})
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function destroyCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists/{calendarListId}:
 *   get:
 *     summary: Get a Google calendar list by ID
 *     description: Get a Google calendar list by ID
 *     operationId: googleShowCalendarListById
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarListIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function showCalendarList(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'showCalendarList')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function createCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists:
 *   get:
 *     summary: List calendar lists
 *     description: List calendar lists
 *     operationId: googleListCalendarLists
 *     tags:
 *       - Google
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function listCalendarLists(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'listCalendarLists')
  })
  try {
    const { query } = req
    const { include } = query
    const calendar = google.calendar({version: 'v3', auth: oauth2Client})
    const calendarListResponse = await calendar.calendarList.list()
    const calendarListItems = calendarListResponse.data.items.map(item => {
      const { id, summary, timeZone, backgroundColor, foregroundColor } = item
      return {
        id,
        summary,
        timeZone,
        backgroundColor,
        foregroundColor
      }
    })
    if (include === 'events') { // TODO: Make more dynamic
      const now = moment()
      for (const calendarListItem of calendarListItems) {
        const options = {
          calendarId: calendarListItem.id,
          timeMin: now.format(), // TODO: Consider historical events
          timeMax: now.add(1, 'year').format() // TODO: Make this configurable (1d, 1w, 1m, 1y, max, etc.)
        }
        const eventListResponse = await calendar.events.list(options) // eslint-disable-line no-await-in-loop
        calendarListItem.events = eventListResponse.data.items
      }
    }
    res.status(status.OK)
    res.body = calendarListItems
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function updateCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists/watch:
 *   post:
 *     summary: Watch calendar lists
 *     description: Watch calendar lists
 *     operationId: googleWatchCalendarLists
 *     tags:
 *       - Google
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function watchCalendarLists(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'watchCalendarLists')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function clearCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function destroyCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}:
 *   get:
 *     summary: Get calendar by ID
 *     description: Get calendar by ID
 *     operationId: googleShowCalendarById
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function showCalendar(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'showCalendar')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function createCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function updateCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function destroyEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events/{eventId}:
 *   get:
 *     summary: Get event by ID
 *     description: Get event by ID
 *     operationId: googleShowEventById
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarIdPathParameter'
 *       - $ref: '#/components/parameters/GoogleEventIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function showEvent(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'showEvent')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function importEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function createEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events/{eventId}/instances:
 *   get:
 *     summary: Get event instances by ID
 *     description: Get event instances by ID
 *     operationId: googleListEventInstances
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarIdPathParameter'
 *       - $ref: '#/components/parameters/GoogleEventIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function listEventInstances(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'listEventInstances')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events:
 *   get:
 *     summary: List events by calendar ID
 *     description: List events by calendar ID
 *     operationId: googleListEventsByCalendarId
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function listEvents(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'listEvents')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function moveEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function updateEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function quickAddEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events/watch:
 *   post:
 *     summary: Watch events
 *     description: Watch events
 *     operationId: googleWatchEvents
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/components/parameters/GoogleCalendarIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function watchEvents(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'google')
    scope.setTag('action', 'watchEvents')
  })
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getOAuthUrl,
  getAccessTokens,
  // destroyCalendarList,
  showCalendarList,
  // createCalendarList,
  listCalendarLists,
  // updateCalendarList,
  // replaceCalendarList,
  watchCalendarLists,
  // clearCalendar,
  // destroyCalendar,
  showCalendar,
  // createCalendar,
  // updateCalendar,
  // replaceCalendar,
  // destroyEvent,
  showEvent,
  // importEvent,
  // createEvent,
  listEventInstances,
  listEvents,
  // moveEvent,
  // updateEvent,
  // quickAddEvent,
  // replaceEvent,
  watchEvents
}
