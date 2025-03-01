const { v4: uuidv4 } = require('uuid')

class Video {
  constructor(
    id = uuidv4(),
    creator,
    title,
    description,
    videoUrl,
    tags,
    comments = [],
    likedUsers = [],
    dislikedUsers = []
  ) {
    this.id = id
    this.creator = creator
    this.title = title
    this.description = description
    this.videoUrl = videoUrl
    this.tags = tags
    this.comments = comments
    this.likedUsers = likedUsers
    this.dislikedUsers = dislikedUsers
    this.countLikes = 0
    this.countDislikes = 0
  }

  static create({
    id,
    creator,
    title,
    description,
    videoUrl,
    tags,
    comments,
    likedUsers,
    dislikedUsers,
  }) {
    return new Video(
      id,
      creator,
      title,
      description,
      videoUrl,
      tags,
      comments,
      likedUsers,
      dislikedUsers
    )
  }
}

module.exports = Video
