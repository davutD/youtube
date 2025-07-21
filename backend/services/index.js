const authService = require('./auth-service')
const userService = require('./database/user-service')
const videoService = require('./database/video-service')
const commentService = require('./database/comment-service')
const cloudStorageService = require('./cloud/storage')
const videoTranscodingService = require('./cloud/transcoding/video-transcoding-service')

module.exports = {
  authService,
  userService,
  videoService,
  commentService,
  cloudStorageService,
  videoTranscodingService,
}
