const status = require('http-status')
const Sentry = require('@sentry/node')

// const environment = require('../environment')
// const elasticsearch = require('../config/elasticsearch')
const serializers = require('../serializers')
// const { } = require('../errors')

/**
 * Attempts to find and authenticate a user and, if valid, returns a JWT.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /search:
 *   get:
 *     summary: Perform a search
 *     description: Perform a search
 *     operationId: listSearchResults
 *     tags:
 *       - Search
 *     parameters:
 *       - $ref: '#/components/parameters/SearchListQueryParameter'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SearchListOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function list(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'search')
    scope.setTag('action', 'list')
  })
  try {
    // const { currentUser } = req
    // const query = req.query
    // const results = await elasticsearch.search({
    //   index: 'docket',
    //   body: {
    //     query: {
    //       bool: {
    //         must: [
    //           {
    //             match: {
    //               name: query
    //             }
    //           },
    //           {
    //             match: {
    //               userId: currentUser.id
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   }
    // })
    const results = {
      body: {
        hits: {
          hits: []
        }
      }
    }
    res.body = serializers.search.list.serialize(results.body.hits.hits)
    res.status(status.OK)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  list
}
