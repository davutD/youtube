const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
    res.send('Hello World!')
  } catch (err) {
    next(err)
  }
})

module.exports = router
