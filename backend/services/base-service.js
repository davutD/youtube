class BaseService {
  constructor(model) {
    this.model = model
  }
  async save(objects) {
    return this.model.insertMany(objects)
  }

  async load() {
    return this.model.find()
  }

  async insert(object) {
    const instance = await this.model.create(object)
    return instance
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, body) {
    return this.model.findByIdAndUpdate(id, body, { new: true })
  }

  async find(id) {
    return this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value })
  }
}

module.exports = BaseService
