const express = require('express')
const app = express() 
const db = require('./db')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


const Playlist = require('./playlist/model')

const playlistRouter = require('./playlist/router')

app.use(jsonParser)
app.use(playlistRouter)








const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})