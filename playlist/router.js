const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()

router.get('/playlists', (req, res, next) => {
  Playlist
    .findAll()
    .then(playlist => {
      if(playlist.length > 0){
        res.status(200).json(playlist)
      }else {
        res.status(204).end()
      }
    })
    .catch(error => next(error))
})

router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if(playlist.name.length > 0 || playlist.name.length < 20) {
        res.status(200).json(playlist)
      } else {
        res.status(422).json({message: 'name is invalid'}).end()
      }
    })
    .catch(error => next(error))
})



router.get('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if(playlist) {
        res.status(200).json(playlist)
      }else {
        res.status(404).json({message: 'playlist is not found'}).end()
      }
    })
    .catch(err => next(err))
})

router.put('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if(playlist){
        playlist
          .update(req.body)
          .then(playlist => res.json(playlist))
          .catch(err => next(err))
      }else {
        res.status(404).json({message: 'playlist is not found'}).end()
      }
    })
})

router.delete('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if (playlist) {
        playlist
          .destroy()
          .then(() => res.send({message: 'Playlist is deleted!'}))
      }else {
        res.status(404).send({message: `Playlist is not found`}).end()
      }
    })
    .catch(error => next(error))
})



module.exports = router