const User = require('./models/user')
const Video = require('./models/video')
const db = require('./database')

const flatted = require('flatted')

const davut = new User('Davut', 'Durmaz', 'durmaz.dvt@gmail.com')
const kaan = new User('Kaan', 'Yurdakos', 'yurdakos.kaan@gmail.com')

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

db.save('users', [davut, kaan])
db.save('videos', [davut.videos, kaan.videos])

someoneNew = new User('Someone', 'New', 'newuser@gmail.com')
db.insert('users', someoneNew)

const videos = db.load('videos')

// users.forEach((user) => console.log(flatted.parse(flatted.stringify(user))))
// videos.forEach((video) => console.log(flatted.parse(flatted.stringify(video))))

db.remove('users', 2)
const davut1 = db.findByName('users', 'Davut')
console.log(davut1)
// users.forEach((user) => console.log(flatted.parse(flatted.stringify(user))))
