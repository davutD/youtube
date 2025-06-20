const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxLength: [5000, 'Content cannot exceed 5000 characters'],
    },
    likeCount: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', CommentSchema)
