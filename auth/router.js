const { Router } = require('express')
const bcrypt = require('bcrypt');
const { toJWT } = require('./jwt')
const auth = require('./middleware')
const User = require('../User/model')

const router = new Router()


router.post('/tokens', (req, res, next)=> {
  const { email, password, password_confirmation } = req.body
  if((email && password) && (password === password_confirmation)) {
    User
      .findOne({
        where: {email: email}
      })
      .then(entity => {
        if(!entity) {
          res.status(400).send({message: 'user or password is incorrect'})
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({jwt: toJWT({ userId: entity.id }) })
        }else {
          res.status(400).send({message: 'Password was incorrect'})
        }
      })
      .catch(error => next(error))
  }else {
    res.status(422).send({message: 'Please supply a valid email and password, or confirm your password'}).end()
  }
})

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})



module.exports = router