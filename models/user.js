const Video = require('./video')

class User {
  constructor(name, surname, email) {
    this.name = name
    this.surname = surname
    this.email = email
    this.videos = []
    this.subscribers = []
  }

  createVideo(title, description, videoUrl, tags) {
    const video = new Video(this, title, description, videoUrl, tags)
    this.videos.push(video)
  }
  likeVideo(video) {
    if (video.likedUsers.includes(this.email))
      throw new Error(`${this.email} already liked this video.`)

    video.likedUsers.push(this.email)
    video.dislikedUsers.splice(video.dislikedUsers.indexOf(this.email), 1)
    video.countDislikes <= 0 ? video.countDislikes == 0 : video.countDislikes--
    video.countLikes++
  }
  dislikeVideo(video) {
    if (video.dislikedUsers.includes(this.email))
      throw new Error(`${this.email} already disliked this video.`)

    video.likedUsers.splice(video.likedUsers.indexOf(this.email), 1)
    video.dislikedUsers.push(this.email)
    video.countDislikes++
    video.countLikes <= 0 ? video.countLikes == 0 : video.countLikes--
  }
  makeComment(video, comment) {
    video.comments.push({ email: this.email, comment: comment })
  }

  subscribeUser(user) {
    if (this.subscribers.includes(user))
      throw new Error(`${user.email} already subscribed.`)

    this.subscribers.push(user)
  }
  unsubscribeUser(user) {
    if (!this.subscribers.includes(user))
      throw new Error(`${user.email} is not subscribed.`)

    this.subscribers.splice(this.subscribers.indexOf(user), 1)
  }
}

module.exports = User
