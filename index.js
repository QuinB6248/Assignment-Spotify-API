const express = require('express')
const app = express() 
const db = require('./db')
const Playlist = require('./playlist/model')
const port = process.env.PORT || 4000













app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})