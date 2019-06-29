const { Router } = require('express')
const Song = require('./model')
const router = new Router()

router.get('/songs', (req, res, next) => {
  Song
    .findAll()
    .then(song => {
      if(song.length > 0){
        res.status(200).json(song)
      }else {
        res.status(204).end()
      }
    })
    .catch(error => next(error))
})

module.exports = router