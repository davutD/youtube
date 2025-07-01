const authService = require('./auth-service')
const userService = require('./user-service')
const videoService = require('./video-service')
const commentService = require('./comment-service')

module.exports = {
  userService,
  videoService,
  commentService,
  authService,
}
