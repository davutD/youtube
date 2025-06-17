const BaseDatabase = require('./base-database')
const User = require('../models/user')

class UserDatabase extends BaseDatabase {
  async findByName(name) {
    const objects = await this.load()
    return objects.find((object) => object.name === name)
  }
}

module.exports = new UserDatabase(User)
