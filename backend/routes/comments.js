const { commentService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const comments = await commentService.load()
    res.send(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const userId = req.query.userId
    const comments = await commentService.findAllByCreatorId(userId)
    res.send(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const comment = await commentService.find(req.params.id)
    if (!comment) res.status(404).send('Cannot find the comment!!')
    res.send(comment)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/replies', async (req, res, next) => {
  try {
    const replies = await commentService.findReplies(req.params.id)
    res.send(replies)
  } catch (err) {
    next(err)
  }
})

module.exports = router
