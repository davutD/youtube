class Video {
  constructor(creator, title, description, videoUrl, tags) {
    this.creator = creator
    this.title = title
    this.description = description
    this.videoUrl = videoUrl
    this.tags = tags
    this.comments = []
    this.likedUsers = []
    this.dislikedUsers = []
    this.countLikes = 0
    this.countDislikes = 0
  }
}

module.exports = Video
