const BaseService = require('./database/base-service')
const User = require('../models/user')

class AuthService extends BaseService {
  async login(req) {
    const { email, password } = req.body
    const user = await this.model.findOne({ email }).select('+password')
    if (!user) {
      throw new Error('Invalid credentials.')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }
    const userSessionData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    }
    req.session.user = userSessionData
    return userSessionData
  }

  async registerUser(req) {
    const userData = req.body
    const user = await this.model.findOne({ email: userData.email })
    if (user) {
      throw new Error('A user with this email address already exists.')
    }
    const newUser = await this.model.create(userData)
    const userSessionData = {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
    }
    req.session.user = userSessionData
    return userSessionData
  }
}

module.exports = new AuthService(User)
