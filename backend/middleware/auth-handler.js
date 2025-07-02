const authHandler = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ message: 'You must be logged in.' })
  }
  if (req.params.userId && req.session.user._id !== req.params.userId) {
    return res.status(403).send({
      message: 'Forbidden: You do not have permission to perform this action.',
    })
  }

  next()
}

module.exports = authHandler
