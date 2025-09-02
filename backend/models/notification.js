const mongoose = require('mongoose')
const { Schema } = mongoose

const NotificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: ['NEW_SUBSCRIBER', 'VIDEO_LIKE', 'NEW_COMMENT'],
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notification', NotificationSchema)
