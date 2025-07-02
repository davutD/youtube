const session = require('express-session')
const MongoStore = require('connect-mongo')

const oneDayInMilliseconds = 86400000
const sessionMaxAge =
  parseInt(process.env.SESSION_MAX_AGE, 10) || oneDayInMilliseconds

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: sessionMaxAge,
  },
})

module.exports = sessionMiddleware
