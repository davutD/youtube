const authHandler = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ message: 'You must be logged in.' })
  }
  req.user = req.session.user
  next()
}

module.exports = authHandler
