const { Router } = require('express')
//const bcrypt = require('bcrypt');
const { toJWT } = require('./jwt')
const auth = require('./middleware')
const User = require('../User/model')

const router = new Router()

//A user is able to sign in by posting to `/tokens` and get a response `{ token: "<JWT>" }`

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
        res.send({jwt: toJWT({ userId: entity.id }) })
        // if (bcrypt.compareSync(req.body.password, entity.password)) {
        //   res.send({jwt: toJWT({ userId: entity.id }) })
        // }else {
        //   res.status(400).send({message: 'Password was incorrect'})
        // }
      })
      .catch(error => next(error))
  }else {
    res.status(422).send({message: 'Please supply a valid email and password, or confirm your password'}).end()
  }
})

//test
router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `You are visiting the secret endpoint ${req.user.email}.`,
  })
})



module.exports = router