const express = require('express')
const app = express() 
const port = process.env.PORT || 4000












app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})