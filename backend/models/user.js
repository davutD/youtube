const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      trim: true,
      minLength: [2, 'Surname must be at least 2 characters'],
      maxLength: [50, 'Surname cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
      minLength: [2, 'Email must be at least 2 characters'],
      maxLength: [50, 'Email cannot exceed 50 characters'],
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.plugin(autopopulate)

module.exports = mongoose.model('User', UserSchema)

// class User {
//   constructor(
//     id = uuidv4(),
//     name,
//     surname,
//     email,
//     videos = [],
//     subscribers = []
//   ) {
//     this.id = id
//     this.name = name
//     this.surname = surname
//     this.email = email
//     this.videos = videos
//     this.subscribers = subscribers
//   }

//   likeVideo(video) {
//     if (video.likedUsers.includes(this.email))
//       throw new Error(`${this.email} already liked this video.`)

//     video.likedUsers.push(this.email)
//     video.dislikedUsers.splice(video.dislikedUsers.indexOf(this.email), 1)
//     video.countDislikes <= 0 ? video.countDislikes == 0 : video.countDislikes--
//     video.countLikes++
//   }
//   dislikeVideo(video) {
//     if (video.dislikedUsers.includes(this.email))
//       throw new Error(`${this.email} already disliked this video.`)

//     video.likedUsers.splice(video.likedUsers.indexOf(this.email), 1)
//     video.dislikedUsers.push(this.email)
//     video.countDislikes++
//     video.countLikes <= 0 ? video.countLikes == 0 : video.countLikes--
//   }
//   makeComment(video, comment) {
//     video.comments.push({ email: this.email, comment: comment })
//   }

//   subscribeUser(user) {
//     if (this.subscribers.includes(user))
//       throw new Error(`${user.email} already subscribed.`)

//     this.subscribers.push(user)
//   }
//   unsubscribeUser(user) {
//     if (!this.subscribers.includes(user))
//       throw new Error(`${user.email} is not subscribed.`)

//     this.subscribers.splice(this.subscribers.indexOf(user), 1)
//   }

//   static create({ id, name, surname, email, videos, subscribers }) {
//     return new User(id, name, surname, email, videos, subscribers)
//   }
// }

// module.exports = User
