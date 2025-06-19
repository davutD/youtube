const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema(
  {
    creator: {},
    title: String,
    description: String,
    videoUrl: String,
    tags: [],
    comments: [],
    likedUsers: [],
    dislikedUsers: [],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Video', VideoSchema)
