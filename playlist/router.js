const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()

router.get('/playlists', (req, res, next) => {
  Playlist
    .findAll()
    .then(playlist => res.send(playlist))
    .catch(error => next(error))
 })

//  router.post('/team', (req, res, next) => {
//    console.log('req.body test:', req.body)
//    Team.create(req.body)
//     .then(team => {
//       console.log('team test:', team)
//       return res.send(team)
//     })
//     .catch(err => next(err))
//  })

//  router.get('/team/:id', (req, res, next) => {
//   const id = req.params.id
//   Team.findByPk(id)
//   .then(team => res.send(team))
//   .catch(err => next(err))
//  })

//  router.put('/team/:id', (req, res, next) => {
//   const id = req.params.id
//   Team.findByPk(id)
//     .then(team => {
//       if(team){
//         team.update(req.body)
//           .then(team => res.send(team))
//           .catch(err => next(err))
//       } else {
//         res.status(404).send({message: 'team is not in database'})
//       }

//     })
//  })
 module.exports = router