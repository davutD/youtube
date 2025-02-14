const User = require('./user')
const Video = require('./video')

const davut = new User('Davut', 'Durmaz', 'durmaz.dvt@gmail.com')

davut.createVideo(
  'JavaScript OOP',
  'JavaScript Object Oriented Programming',
  'https://www.youtube.com/watch?v=OvD7J3Hn9Uw',
  ['JavaScript', 'OOP']
)

davut.createVideo(
  'JavaScript Array Methods',
  'JavaScript Array Methods',
  'https://www.youtube.com/watch?v=OvD7J3Hn9Uw',
  ['JavaScript', 'Array', 'Methods']
)

console.log(davut.videos.length)
