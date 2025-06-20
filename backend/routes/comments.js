const { commentDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const comments = await commentDatabase.load()
  res.send(comments)
})

router.get('/:id', async (req, res) => {
  const comment = await commentDatabase.find(req.params.id)
  if (!comment) res.status(404).send('Cannot find the comment!!')
  res.send(comment)
})

router.post('/', async (req, res) => {
  const newComment = await commentDatabase.insert(req.body)
  res.status(201).send(newComment)
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const comment = await commentDatabase.update(id, req.body)
  res.send(comment)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await commentDatabase.removeBy('_id', id)
  res.send(`comment with id of ${id} is successfully deleted.`)
})

module.exports = router
