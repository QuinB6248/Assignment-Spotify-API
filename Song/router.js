const { Router } = require('express')
const Song = require('./model')
const router = new Router()
const Playlist = require('../playlist/model')
const auth = require('../auth/middleware')

// router.get('/playlists/:id/songs', (req, res, next) => {
//   Song
//     .findAll({ include: [Playlist] })
//     .then(song => {
//       if(song.length > 0){
//         res.status(200).json(song)
//       }else {
//         res.status(204).end()
//       }
//     })
//     .catch(error => next(error))
// })



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




module.exports = router