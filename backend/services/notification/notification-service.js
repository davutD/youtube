const BaseService = require('../database/base-service')
const Notification = require('../../models/notification')

const { onlineUsers } = require('../../socket/handler')

class NotificationService extends BaseService {
  constructor(io) {
    super(Notification)
    this.io = io
  }

  async findAllByRecipient(recipientId) {
    return this.model
      .find({ recipient: recipientId })
      .populate('sender', 'name surname avatarUrl')
      .sort({ createdAt: -1 })
  }

  async sendToUser(userId, eventName, payload) {
    const notification = await Notification.create({
      recipient: userId,
      sender: payload.senderId,
      type: eventName.toUpperCase(),
      message: payload.message,
      link: payload.link,
    })

    const socketId = onlineUsers.get(userId.toString())

    if (socketId) {
      const populatedNotification = await notification.populate(
        'sender',
        'name avatarUrl'
      )
      this.io.to(socketId).emit(eventName, populatedNotification)
    }
  }
}

module.exports = NotificationService
