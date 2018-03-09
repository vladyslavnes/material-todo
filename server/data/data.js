const express = require('express')
const Todo = require('./model')
const router = express.Router()

router.post('/todos', (req, res, next) => {
  // create a new Mongo document instance
  let newTodo = new Todo(req.body)
  // save it to DB
  newTodo.save()
    .then(todo => {
      // return saved todo
      res.json({todo})
    })
    .catch(next)
})

router.get('/todos', (req, res, next) => {
  Todo.find({})
    .then(todos => {
      res.json(todos)
    })
    .catch(next)
})

router.get('/todos/:id', (req, res, next) => {
  Todo.findOne({_id: req.params.id})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.put('/todos/:id', (req, res, next) => {
  Todo.findOneAndUpdate({_id: req.params.id}, {...req.body})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.delete('/todos/:id', (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})

// If error happened in Node, return error. Otherwise call next handler
router.use((error, req, res, next) => {
  if (error) {
    console.log(error)
    return res.status(400).json({error})
  }
  next(error)
})

// If got no error code return status 500 - unknown error
router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = router
