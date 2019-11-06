/**
 * Sends a JSON response.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function sendJsonResponse(req, res, next) {
  const { body } = res
  res.json(body)
  return next()
}

module.exports = sendJsonResponse
