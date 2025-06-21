const { commentService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const comments = await commentService.load()
  res.send(comments)
})

router.get('/search', async (req, res) => {
  const userId = req.query.userId
  const comments = await commentService.findByCreatorId(userId)
  res.send(comments)
})

router.get('/:id', async (req, res) => {
  const comment = await commentService.find(req.params.id)
  if (!comment) res.status(404).send('Cannot find the comment!!')
  res.send(comment)
})

module.exports = router
