const { userDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await userDatabase.load()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const user = await userDatabase.find(req.params.id)
  if (!user) res.status(404).send('Cannot find the user!!')
  res.send(user)
})

router.post('/', async (req, res) => {
  const newUser = await userDatabase.insert(req.body)
  res.status(201).send(newUser)
})

// router.post('/:id/videos', async (req, res) => {
//   const { id } = req.params
//   const user = await userDatabase.find(id)
//   user.createVideo(req.body)
//   await userDatabase.update(user)
//   res.status(201).send(user)
// })

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const user = await userDatabase.update(id, req.body)
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await userDatabase.removeBy('_id', id)
  res.send(`User with id of ${id} is successfully deleted.`)
})

module.exports = router
