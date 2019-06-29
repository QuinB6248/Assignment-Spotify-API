const express = require('express')
const app = express() 
const db = require('./db')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Song = require('./Song/model')
const Playlist = require('./Playlist/model')
const User = require('./User/model')


const playlistRouter = require('./Playlist/router')
//const songRouter = require('./Song/router')
const authRouter = require('./auth/router')
const userRouter = require('./User/router')

app.use(jsonParser)
app.use(playlistRouter)
//app.use(songRouter)
app.use(authRouter)
app.use(userRouter)








const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})