const { authService } = require('../services')
const authHandler = require('../middleware/auth-handler')
const router = require('express').Router()

router.post('/login', async (req, res, next) => {
  try {
    const user = await authService.login(req)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await authService.registerUser(req)
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})

router.post('/logout', authHandler, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    res.clearCookie('connect.sid')
    res.send({ message: 'Logout successful!' })
  })
})

router.get('/me', authHandler, (req, res) => {
  res.send({ user: req.session.user })
})

module.exports = router
