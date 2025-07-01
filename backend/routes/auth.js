const { authService } = require('../services')
const router = require('express').Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.login(email, password)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await authService.createUser(req.body)
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router
