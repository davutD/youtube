const authService = require('./auth-service')
const userService = require('./database/user-service')
const videoService = require('./database/video-service')
const commentService = require('./database/comment-service')
const cloudStorageService = require('./cloud/storage')
const notificationService = require('./notification/notification-service')

module.exports = {
  authService,
  userService,
  videoService,
  commentService,
  cloudStorageService,
  notificationService,
}
