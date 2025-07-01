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
        autopopulate: false,
      },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.plugin(autopopulate)

module.exports = mongoose.model('User', UserSchema)
