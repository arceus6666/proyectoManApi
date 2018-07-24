const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    nickName: String
  },
  edition: {
    type: Number,
    required: true
  },
  publishing: {
    type: Date,
    required: true
  },
  editorial: {
    type: String,
    default: 'Unknown'
  },
  area: {
    type: String,
    default: 'Unknown'
  },
  requested: {
    type: Boolean,
    required: true,
    default: false
  },
  borrowed: {
    type: Boolean,
    required: true,
    default: false
  },
  dateBorrowed: {
    type: Date,
    default: null
  },
  borrowerID: {
    type: String,
    default: null
  },
  onDate: {
    type: Boolean,
    default: null
  }
})

var Book = mongoose.model('Book', bookSchema)

module.exports = Book
