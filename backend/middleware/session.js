const session = require('express-session')
const MongoStore = require('connect-mongo')

const MONGO_URI = 'mongodb://127.0.0.1:27017/youtube-clone'

const sessionMiddleware = session({
  secret: 'a-very-strong-and-long-secret-key-for-your-youtube-clone', // IMPORTANT: Replace with your own secret
  resave: false,
  saveUninitialized: false, // Don't create a session until something is stored
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: 'sessions', // The collection where sessions will be stored
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session expiration time: 24 hours
  },
})

module.exports = sessionMiddleware
