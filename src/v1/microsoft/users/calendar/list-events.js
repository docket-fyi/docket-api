const fetch = require('node-fetch')
const status = require('http-status')

const debug = require('../../../config/debug').microsoft
const {
  MicrosoftMissingCalendarIdError,
  MicrosoftMissingAccessTokenError
} = require('../../../errors')

/**
 * [listEvents description]
 *
 * @param   {String}  accessToken  [accessToken description]
 *
 * @return  {Response}
 */
async function listEvents(calendarId, accessToken) {
  if (!calendarId) throw new MicrosoftMissingCalendarIdError()
  if (!accessToken) throw new MicrosoftMissingAccessTokenError()
  try {
    const url = `https://graph.microsoft.com/v1.0/me/calendars/${calendarId}/events`
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }
    debug(`-> ${options.method} ${url}`)
    const response = await fetch(url, options)
    debug(`<- ${options.method} ${url} (${response.status} ${status[response.status]})`)
    return response
  } catch (err) {
    debug(`Error getting Microsoft events (${err.name}): ${err.message}`)
    throw err
  }
}

module.exports = listEvents
