const Video = require('./video')

class User {
  constructor(name, surname, email) {
    this.name = name
    this.surname = surname
    this.email = email
    this.videos = []
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
  }
  dislikeVideo(video) {
    if (video.dislikedUsers.includes(this.email))
      throw new Error(`${this.email} already disliked this video.`)

    video.likedUsers.splice(video.likedUsers.indexOf(this.email), 1)
    video.dislikedUsers.push(this.email)
  }
  makeComment(video, comment) {
    video.comments.push({ email: this.email, comment: comment })
  }
}

module.exports = User
