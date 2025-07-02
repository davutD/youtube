const authHandler = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.status(401).send({
    error: {
      message: 'You must be logged in to access this resource.',
    },
  })
}

module.exports = authHandler
