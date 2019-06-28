const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()

router.get('/playlists', (req, res, next) => {
  Playlist
    .findAll()
    .then(playlist => res.send(playlist))
    .catch(error => next(error))
})

router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
       return res.send(playlist)
     })
    .catch(error => next(error))
})

router.get('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => res.send(playlist))
    .catch(err => next(err))
})

router.put('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if(playlist){
        playlist
          .update(req.body)
          .then(playlist => res.send(playlist))
          .catch(err => next(err))
      } else {
        res.status(404).send({message: 'playlist is not in database'})
       }
    })
})

router.delete('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({message: `Customer does not exist`})
      }
      return playlist
        .destroy()
        .then(() => res.send({message: 'Playlist is deleted!'}))
    })
    .catch(error => next(error))
})



module.exports = router