class User {
  constructor(name, surname, email) {
    this.name = name
    this.surname = surname
    this.email = email
  }
}

class Video {
  constructor(title, description, videoUrl) {
    this.title = title
    this.description = description
    this.videoUrl = videoUrl
  }
}

const davut = new User('Davut', 'Durmaz', 'durmaz.dvt@gmail.com')
console.log(JSON.stringify(davut, null, 2))
