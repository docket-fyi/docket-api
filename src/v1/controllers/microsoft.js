/* eslint-disable max-lines */

const status = require('http-status')
const qs = require('qs')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url');

const environment = require('../environment')
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
    res.status(status.OK).json([])
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
