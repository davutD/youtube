const router = require('express').Router()
const { videoService } = require('../services')

router.post('/video-processed', async (req, res, next) => {
  try {
    const { public_id, eager, notification_type } = req.body

    if (notification_type === 'eager') {
      const videoId = public_id
      const playbackUrl = eager[0].secure_url
      const thumbnailUrl = eager[0].secure_url.replace(/\.\w+$/, '.jpg')
      await videoService.finalizeProcessing(videoId, {
        status: 'COMPLETED',
        playbackUrl,
        thumbnailUrl,
      })
    }

    res.status(200).send({ message: 'Notification received.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
