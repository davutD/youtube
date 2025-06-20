const { videoService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const videos = await videoService.load()
  res.send(videos)
})

router.get('/:id', async (req, res) => {
  const video = await videoService.find(req.params.id)
  if (!video) res.status(404).send('Cannot find the video!!')
  res.send(video)
})

router.post('/', async (req, res) => {
  const newVideo = await videoService.insert(req.body)
  res.status(201).send(newVideo)
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const video = await videoService.update(id, req.body)
  res.send(video)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await videoService.removeBy('_id', id)
  res.send(`video with id of ${id} is successfully deleted.`)
})

module.exports = router
