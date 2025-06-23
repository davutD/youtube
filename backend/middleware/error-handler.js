const errorHandler = (error, req, res, next) => {
  console.error(error)
  let statusCode = 500
  if (error.message.includes('could not be found')) {
    statusCode = 404
  } else if (error.message.includes('cannot subscribe to yourself')) {
    statusCode = 400
  }
  res.status(statusCode).send({
    error: {
      message: error.message || 'An unexpected error occurred.',
    },
  })
}

module.exports = errorHandler
