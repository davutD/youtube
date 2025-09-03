const router = require('express').Router()
const authHandler = require('../middleware/auth-handler')
const { notificationService } = require('../services')

router.get('/', authHandler, async (req, res, next) => {
  try {
    const notifications = await notificationService.findAllByRecipient(
      req.user._id
    )
    res.send(notifications)
  } catch (err) {
    next(err)
  }
})

module.exports = router
