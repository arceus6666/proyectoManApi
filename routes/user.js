const express = require('express')
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/register-user', userCtrl.signUp)
api.get('/find-user', userCtrl.getById)
api.get('/login', userCtrl.login)
api.put('/update', userCtrl.update)
api.put('/disable', userCtrl.disable)
api.get('find-all', userCtrl.getAll)
api.get('/private', auth, (req, res) => {
  res.status(200).send(true)
})

module.exports = api
