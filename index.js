const User = require('./models/user')
const Video = require('./models/video')

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

// console.log(flatted.parse(flatted.stringify(davut.videos)))
// console.log(flatted.parse(flatted.stringify(kaan.videos)))

davut.subscribeUser(kaan)
davut.makeComment(kaan.videos[0], 'Great video!')
davut.dislikeVideo(kaan.videos[0])
console.log(flatted.parse(flatted.stringify(kaan.videos[0])))
davut.likeVideo(kaan.videos[0])
console.log(flatted.parse(flatted.stringify(kaan.videos[0])))
