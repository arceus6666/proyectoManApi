const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const Book = require('./book')

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: Boolean,
    default: false,
    required: true
  },
  lastLogin: Date,
  able:{
    type: Boolean,
    required: true,
    default:true
  }

})

userSchema.pre('save', (next) => {
  var user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next()
      user.password = hash
      next()
    })
  })
})

var User = mongoose.model('User', userSchema)

module.exports = User
