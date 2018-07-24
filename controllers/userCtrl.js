const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    password: req.body.password,
    role: req.body.role
  })

  user.save((err) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(200).send({token: service.createToken(user)})
    }
  })
}

function login (req, res) {
  param = req.query.param.split(' ')
  User.find({email: param[0]}, (err, user) => {
    if (!err) {
      let u = user[0]
      if (u.password === param[1]) {
        res.status(200).send({role: u.role, _id:u._id})
        user.lastLogin = Date.now()
        u.save((err) => {
          if (err) {
            console.log(err)
            res.status(500).send(err)
          }
        })
      }
      else {
        console.log('fail')
        res.status(403).send({message: 'Contraseña incorrecta.'})
      }
    } else {
      res.status(500).send({message: 'Usuario inexistente.'})
    }
  })
}

function getById (req, res) {
  console.log('serching by id'+ req.query.param)
  User.findOne({_id: req.query.param}, (err, user) => {
    if (!err) {
      console.log('user found')
      res.status(200).send(user)
    } else {
      res.status(500).send(err)
    }
  })
}

function update (req, res) {
  console.log('update')
  User.findOne({_id: req.body._id}, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      user.email = req.body.email
      user.name = req.body.name
      user.lastName = req.body.lastName
      user.age = req.body.age
      user.password = req.body.password
      user.signupDate = req.body.signupDate
      user.role = req.body.role
      user.lastLogin = req.body.lastLogin
      user.able = req.body.able
      user.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          console.log(user)
          res.status(200).send({mensaje: 'Se guardó la informacion', ok: true})
        }
      })
    }
  })
}

function disable(req, res) {
  User.findOne({_id: req.body._id}, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      user.email = req.body.email
      user.name = req.body.name
      user.lastName = req.body.lastName
      user.age = req.body.age
      user.password = req.body.password
      user.signupDate = req.body.signupDate
      user.role = req.body.role
      user.lastLogin = req.body.lastLogin
      user.able = false
      user.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          console.log(user)
          res.status(200).send({mensaje: 'Se guardó la informacion', ok: true})
        }
      })
    }
  })
}

function getAll (req, res) {
  User.find({}, (err, users) => {
    if (!err) {
      console.log('user found')
      res.status(200).send(users)
    } else {
      res.status(500).send(err)
    }
  })
}

module.exports = {
  signUp,
  getById,
  login,
  update,
  getAll,
  disable
}
