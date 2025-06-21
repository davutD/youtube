const { videoService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const videos = await videoService.load()
  res.send(videos)
})

router.get('/search', async (req, res) => {
  const userId = req.query.userId
  const videos = await videoService.findAllByCreatorId(userId)
  res.send(videos)
})

router.get('/:videoId', async (req, res) => {
  const video = await videoService.find(req.params.videoId)
  if (!video) res.status(404).send('Cannot find the video!!')
  res.send(video)
})

router.get('/:videoId/comments', async (req, res) => {
  const videoId = req.params.videoId
  const comments = await videoService.findCommentsByVideo(videoId)
  res.send(comments)
})

module.exports = router
