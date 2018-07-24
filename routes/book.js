const express = require('express')
const bookCtrl = require('../controllers/bookCtrl')
const api = express.Router()
const auth = require('../middlewares/auth')

api.post('/register-book', bookCtrl.insertBook)
api.get('/get-books', bookCtrl.getAll)
api.get('/get-by-name/', bookCtrl.getByName)
api.get('/get-by-area/', bookCtrl.getByArea)
api.get('/get-by-author/', bookCtrl.getByAuthor)
api.get('/get-by-year/', bookCtrl.getByYear)
api.get('/get-requested', bookCtrl.getByRequested)
api.get('/find-mine', bookCtrl.getByBorrowerID)
api.get('/get-borrowed', bookCtrl.getByBorrowed)
api.put('/update', bookCtrl.update)
api.get('/private', auth, (req, res) => {
  res.status(200).send({message: 'Autorización correcta.'})
})


module.exports = api
