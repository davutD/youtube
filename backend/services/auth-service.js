const BaseService = require('./base-service')
const User = require('../models/user')

class AuthService extends BaseService {
  async login(email, password) {
    const user = await this.model.findOne({ email }).select('+password')
    if (!user) {
      throw new Error('Invalid credentials.')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }
    return this.find(user._id)
  }

  async createUser(userData) {
    const user = await this.model.findOne({ email: userData.email })
    if (user) {
      throw new Error('A user with this email address already exists.')
    }
    return this.model.create(userData)
  }
}

module.exports = new AuthService(User)
