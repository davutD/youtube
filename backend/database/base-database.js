class BaseDatabase {
  constructor(model) {
    this.model = model
  }
  async save(objects) {
    return await this.model.insertMany(objects)
  }

  async load() {
    return await this.model.find()
  }

  async insert(object) {
    const instance = await this.model.create(object)
    return instance
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, body) {
    return await this.model.findByIdAndUpdate(id, body, { new: true })
  }

  async find(id) {
    return await this.model.findById(id)
  }

  async findBy(property, value) {
    return await this.model.find({ [property]: value })
  }
}

module.exports = BaseDatabase
