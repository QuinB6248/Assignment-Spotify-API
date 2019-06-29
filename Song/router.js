const { Router } = require('express')
const Song = require('./model')
const router = new Router()
const Playlist = require('../playlist/model')
const auth = require('../auth/middleware')

// `POST /playlists/:id/songs`: A user is able to add songs to their playlists. 
//A song has:
//* A title
//* An artist (name)
//* An album (title)
//* A song can only be on one playlist.

router.post('/playlists/:id/songs', auth, (req, res, next) => {
  const playlistId = parseInt(req.params.id)
   Playlist
     .findByPk(playlistId)
     .then(playlist => {
        if(playlist.userId !== req.user.id){
          return res.status(401).json({message: 'you are not authorized'})
        }
        Song
          .findOne({
            where: req.body
          })
          .then(song => {
            if(song){
              return res.status(422).json({message: 'song already exists'})
            }else {
              Song
                .create({
                  ...req.body,
                  playlistId: playlistId
                })
                .then(song => {
                  if(song) {
                    res.status(200).json(song)
                  }else {
                    res.status(422).json({message: 'name is invalid'})
                  }
                })
                .catch(error => next(error))
              }
            })
            .catch(error => next(error))
          })
      .catch(error => next(error))
})

//PUT /playlists/:id/songs/:id`: A user is able to change song information
router.put('/playlists/:id/songs/:songId', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const songId = parseInt(req.params.songId)
  Playlist
    .findByPk(id)
    .then(playlist => {
      if(playlist && playlist.userId === req.user.id){
        Song
          .findByPk(songId)
          .then(song => {
            if(song){
              song
                .update(req.body)
                .then(song => res.json(song))
                .catch(error => next(error))
            }
            else{res.status(404).json({message: 'Song does not exist'})}
          })
          .catch(error => next(error))
      }else {
        res.status(404).json({message: `playlist does not exist, or does not belong to authenticated user`}).end()
      }
    })
})

//DELETE /playlists/:id/songs/:id`: A user is able to delete songs from their playlist
router.delete('/playlists/:id/songs/:songId', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const songId = parseInt(req.params.songId)
  Playlist
    .findByPk(id)
    .then(playlist => {
      if (playlist && playlist.userId === req.user.id) {
        Song
          .findByPk(songId)
          .then(song => {
            if(song){
              song
                .destroy()
                .then(song => res.json({message: 'Song is deleted!'}))
                .catch(error => next(error))
            }
            else{res.status(404).json({message: 'Song does not exist'})}
          })
          .catch(error => next(error))
        
      }else {
        res.status(404).json({message: `playlist does not exist, or does not belong to authenticated user`}).end()
      }
    })
    .catch(error => next(error))
})
//GET all songs
router.get('/playlists/:id/songs', (req, res, next) => {
  Song
    .findAll({ include: [Playlist] })
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