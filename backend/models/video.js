const mongoose = require('mongoose')
const { Schema } = mongoose

const VideoSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [2, 'Title must be at least 2 character'],
      maxLength: [200, 'Title cannot exceed 200 character'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [2, 'Description must be at least 2 character'],
      maxLength: [5000, 'Description cannot exceed 5000 character'],
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Video Url must be at least 2 character'],
      maxLength: [3000, 'Video Url cannot exceed 3000 character'],
    },
    tags: [],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Video', VideoSchema)
