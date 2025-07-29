const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const bcrypt = require('bcrypt')

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
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
      ],
      // `select: false` ensures the password hash is NOT returned in queries by default.
      select: false,
    },
    avatarUrl: {
      type: String,
      trim: true,
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const saltRounds = +process.env.BCRYPT_SALT_ROUNDS || 10
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)

    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.plugin(autopopulate)

module.exports = mongoose.model('User', UserSchema)
