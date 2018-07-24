const Book = require('../models/book')

function insertBook (req, res) {
  var book = new Book({
    name: req.body.name,
    author: req.body.author,
    edition: req.body.edition,
    publishing: req.body.publishing,
    editorial: req.body.editorial,
    area: req.body.area,
    requested: req.body.requested,
    borrowed: req.body.borrowed,
    dateBorrowed: req.body.dateBorrowed,
    borrowerID: req.body.borrowerID,
    onDate: req.body.onDate
  })
  book.save().then(
    (us) => {
      res.send(us)
    },
    (err) => {
      res.send(err)
    }
  )
}

function getAll (req, res) {
  Book.find({}, (err, books) => {
    if (!err) {
      res.status(200).send(books)
    } else {
      res.status(500).send(err)
    }
  })
}

function update (req, res) {
  Book.findOne({_id: req.body._id}, (err, book) => {
    if (err) {
      res.send(err)
    } else {
      book.name = req.body.name
      book.author = req.body.author
      book.edition = req.body.edition
      book.publishing = req.body.publishing
      book.editorial = req.body.editorial
      book.area = req.body.area
      book.dateBorrowed = Date.now()
      book.requested = req.body.requested
      book.borrowed = req.body.borrowed
      book.borrowerID = req.body.borrowerID
      book.onDate = req.body.onDate
      book.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          console.log(book)
          res.status(200).send({mensaje: 'Se guardó la informacion', ok: true})
        }
      })
    }
  })
}

function deleteByID (req, res) {
  Book.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send({mensaje: 'Objeto eliminado'})
    }
  })
}

function getByRequested (req, res) {
  Book.find({requested: true}, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(books)
    }
  })
}

function getByName (req, res) {
  console.log('getbyname')
  let param = req.query.param + ""
  console.log(param)
  Book.find({name: param}, (err, books) => {
    if (!err) {
      res.status(200).send(books)
    } else {
      res.status(500).send(err)
    }
  })
}

function getByArea (req, res) {
  let param = req.query.param + ""
  
  Book.find({area: param}, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(books)
    }
  })
}

function getByAuthor (req, res) {
  let param = req.query.param + ""
  param = param.split(' ')
  param = {firstName: param[0], lastName: param[1]}
  console.log(param)
  Book.find({author: param}, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(books)
    }
  })
}

function getByYear (req, res) {
  let param = parseInt(req.query.param)
  Book.find({
    publishing: 
      {
        $gte: new Date(param + "-01-01T00:00:00.000Z"),
        $lt: (param + 1)  + "-01-01T00:00:00.000Z"}
  }, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(books)
    }
  })
}

function getByBorrowerID (req, res) {
  console.log('getbyname')
  let param = req.query.param
  console.log(param)
  Book.find({borrowerID: param}, (err, books) => {
    if (!err) {
      res.status(200).send(books)
    } else {
      res.status(500).send(err)
    }
  })
}

function getByBorrowed (req, res) {
  let param = req.query.param.split(' ')
  Book.find({
    publishing: {
      $gte: new Date(param[0] + "-01-01T00:00:00.000Z"),
      $lte: new Date(param[1]  + "-01-01T00:00:00.000Z")
    },
    borrowed: true
  }, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(books)
    }
  })
}


module.exports = {
  insertBook,
  getAll,
  getByName,
  getByArea,
  getByAuthor,
  getByYear,
  update,
  deleteByID,
  getByRequested,
  getByBorrowerID,
  getByBorrowed
}
