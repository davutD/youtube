const { videoService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const videos = await videoService.load()
  res.send(videos)
})

router.get('/search', async (req, res) => {
  const userId = req.query.userId
  const videos = await videoService.findByCreatorId(userId)
  res.send(videos)
})

router.get('/:id', async (req, res) => {
  const video = await videoService.find(req.params.id)
  if (!video) res.status(404).send('Cannot find the video!!')
  res.send(video)
})

module.exports = router
