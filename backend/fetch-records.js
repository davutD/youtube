const User = require('./models/user')
const Video = require('./models/video')
const { userDatabase, videoDatabase } = require('./database')

async function main() {
  const davut = User.create({
    name: 'Davut',
    surname: 'Durmaz',
    email: 'durmaz.dvt@gmail.com',
  })
  const kaan = User.create({
    name: 'Kaan',
    surname: 'Yurdakos',
    email: 'yurdakos.kaan@gmail.com',
  })

  davut.createVideo(
    'JavaScript OOP',
    'JavaScript Object Oriented Programming',
    'https://www.youtube.com/watch?v=OvD7J3Hn9Uw',
    ['JavaScript', 'OOP']
  )

  kaan.createVideo(
    'JavaScript Array Methods',
    'JavaScript Array Methods',
    'https://www.youtube.com/watch?v=OvD7J3Hn9Uw',
    ['JavaScript', 'Array', 'Methods']
  )

  davut.subscribeUser(kaan)
  davut.makeComment(kaan.videos[0], 'Great video!')
  davut.dislikeVideo(kaan.videos[0])
  davut.likeVideo(kaan.videos[0])

  userDatabase.save([davut, kaan])
  videoDatabase.save([davut.videos, kaan.videos])

  const davutClone = userDatabase.findByName('Davut')
  davutClone.createVideo(
    'JavaScript OOP New Video',
    'JavaScript Object Oriented Programming New Video',
    'https://www.youtube.com/watch?v=OvD7J3Hn9Uw',
    ['JavaScript', 'OOP']
  )
  userDatabase.update(davutClone)

  console.log('Users')
}

main()
