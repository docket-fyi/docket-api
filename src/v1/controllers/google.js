const status = require('http-status')
const { google } = require('googleapis')

const environment = require('../environment')
const { GoogleOAuthMissingAuthorizationCodeError } = require('../errors')
const oauth2Client = require('../config/google')

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getOAuthUrl(req, res, next) {
  try {
    const url = oauth2Client.generateAuthUrl({
      // access_type: 'online|offline',
      scope: environment.google.scopes()
    })
    res.status(status.OK).json({ url })
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
 *
 * @return {Promise<undefined>}
 */
async function getAccessTokens(req, res, next) {
  try {
    const { query, currentUser } = req
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new GoogleOAuthMissingAuthorizationCodeError()
    }
    const { tokens } = await oauth2Client.getToken(code)
    await currentUser.update({tokens})
    res.status(status.OK).send()
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function destroyCalendarList(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function getCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function insertCalendarList(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getAllCalendarLists(req, res, next) {
  try {
    const calendar = google.calendar({version: 'v3', auth: oauth2Client})
    const response = await calendar.calendarList.list()
    // @todo GoogleCalendarList.create(response.data.items)
    const items = response.data.items.map(item => {
      const { id, summary, timeZone, backgroundColor, foregroundColor } = item
      return {
        id,
        summary,
        timeZone,
        backgroundColor,
        foregroundColor
      }
    })
    res.status(status.OK).json(items)
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function patchCalendarList(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function updateCalendarList(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function watchCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function clearCalendar(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function destroyCalendar(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function getCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function createCalendar(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function patchCalendar(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function updateCalendar(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function destroyEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function getEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function importEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function createEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function getEventInstances(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

async function getAllEvents(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

// async function moveEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function patchEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function quickAddEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

// async function updateEvent(req, res, next) {
//   try {
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// }

async function watchEvent(req, res, next) {
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
  getCalendarList,
  // insertCalendarList,
  getAllCalendarLists,
  // patchCalendarList,
  // updateCalendarList,
  watchCalendarList,
  // clearCalendar,
  // destroyCalendar,
  getCalendar,
  // createCalendar,
  // patchCalendar,
  // updateCalendar,
  // destroyEvent,
  getEvent,
  // importEvent,
  // createEvent,
  getEventInstances,
  getAllEvents,
  // moveEvent,
  // patchEvent,
  // quickAddEvent,
  // updateEvent,
  watchEvent
}
