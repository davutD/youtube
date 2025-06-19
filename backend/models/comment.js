const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    content: String,
    likeCount: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', CommentSchema)
