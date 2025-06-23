const { videoService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const videos = await videoService.load()
    res.send(videos)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const userId = req.query.userId
    const videos = await videoService.findAllByCreatorId(userId)
    res.send(videos)
  } catch (err) {
    next(err)
  }
})

router.get('/:videoId', async (req, res, next) => {
  try {
    const video = await videoService.find(req.params.videoId)
    res.send(video)
  } catch (err) {
    next(err)
  }
})

router.get('/:videoId/comments', async (req, res, next) => {
  try {
    const videoId = req.params.videoId
    const comments = await videoService.findCommentsByVideo(videoId)
    res.send(comments)
  } catch (err) {
    next(err)
  }
})

module.exports = router
