const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()
const Song = require('../Song/model')
const auth = require('../auth/middleware')

//GET /playlists A user is able to retrieve all their playlists
router.get('/playlists', auth, (req, res, next) => {
  Playlist
    .findAll({
      where: {userId: req.user.id}
    })
    .then(playlist => {
      if(playlist.length > 0){
        res.status(200).json(playlist)
      }else {
        res.status(204).end()
      }
    })
    .catch(error => next(error))
})

//POST /playlists user is able to create a playlist (with just a name)
router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create({
      ...req.body,
      userId: req.user.id
    })
    .then(playlist => {
      if(playlist.name.length > 0 || playlist.name.length < 20) {
        res.status(200).json(playlist)
      } else {
        res.status(422).json({message: 'name is invalid'}).end()
      }
    })
    .catch(error => next(error))
})

//GET /playlists/:id A user is able to get a single one of their playlists, with all the songs on it (but no others)
router.get('/playlists/:id', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  Playlist
    .findByPk(id)
    .then(playlist => {
      if(playlist && playlist.userId === req.user.id) {
         Song
           .findAll({where: {playlistId: id}})
           .then(songs => res.json({playlist : playlist, songs: songs}))
           .catch(error=> next(error))
      }else {
        res.status(404).json({message: `playlist does not exist, or does not belong to authenticated user`}).end()
      }
    })
    .catch(error => next(error))
})

//PUT /playlist/:id A user may edit their playlist
router.put('/playlists/:id', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  Playlist
    .findByPk(id)
    .then(playlist => {
      if(playlist && playlist.userId === req.user.id){
        playlist
          .update(req.body)
          .then(playlist => res.json(playlist))
          .catch(error => next(error))
      }else {
        res.status(404).json({message: `playlist does not exist, or does not belong to authenticated user`}).end()
      }
    })
})

//DELETE /playlists/:id`: A user may delete their playlists, and all songs on it
router.delete('/playlists/:id', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if (playlist && playlist.userId === req.user.id) {
        playlist
          .destroy()
          .then(() => {
            Song
              .findAll({where: {playlistId: id}})
              .then(songs => songs.destroy())
              .catch(error=> next(error))
          })
          .then(() => res.send({message: 'Playlist is deleted!'}))
      }else {
        res.status(404).json({message: `playlist does not exist, or does not belong to authenticated user`}).end()
      }
    })
    .catch(error => next(error))
})



module.exports = router