const fs = require('fs')
const flatted = require('flatted')

class BaseDatabase {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }
  async save(objects) {
    fs.writeFile(`./${this.filename}.json`, flatted.stringify(objects))
  }

  async load() {
    const file = fs.readFileSync(`./${this.filename}.json`, 'utf8')
    const objects = flatted.parse(file)
    return objects.map(this.model.create)
  }

  async insert(object) {
    const objects = await this.load()
    return this.save(objects.concat(object))
  }

  async remove(index) {
    const objects = await this.load()
    objects.splice(index, 1)
    await this.save(objects)
  }

  async update(object) {
    const objects = await this.load()

    const index = objects.findIndex((obj) => obj.id == object.id)

    if (index == -1)
      throw new Error(
        `Cannot find ${this.model.name} instance with id ${object.id}`
      )

    objects.splice(index, 1, object)
    await this.save(objects)
  }

  async find(id) {
    return await this.load().find((o) => o.id == id)
  }

  async findBy(property, value) {
    return await this.load().find((o) => o[property] == value)
  }
}

module.exports = BaseDatabase
