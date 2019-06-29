const { Router } = require('express')
const User = require('./model')
const router = new Router()
 //const bcrypt = require('bcrypt');
 
 //A user is able to sign up by posting `email`, `password`, and `password_confirmation` to `/users`
 
 router.post('/users', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password//bcrypt.hashSync(req.body.password, 10)
  }
  if(!req.body.email || !req.body.password) {
    res.status(404).json({message: 'password or email unknown'}).end()
  }else {
    if(req.body.password_confirmation === req.body.password) {
      User.create(user)
     .then(user => {
       return res.send(user)
     })
     .catch(err => next(err))
    } else {
      res.status(422).json({message: 'password and password_confirmation do not match'}).end()
    }
  }
  
  
})

module.exports = router