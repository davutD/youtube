const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/youtube-clone')
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log('Connection error', err))
