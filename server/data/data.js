const express = require('express')

const Todo = require('./model')

const router = express.Router()

router.post('/todos', (req, res, next) => {
  let newTodo = new Todo(req.body)
  newTodo.save()
    .then(todo => {
      res.end(200)
    })
    .catch(err => console.error(err))
})

router.get('/todos', (req, res, next) => {
 Todo.find({})
   .then(todo => {
     res.json({todo})
   })
   .catch(next)
})

router.put('/todos/:id', (req, res, next) => {
  Todo.findOneAndUpdate({_id: req.params.id}, {...req.body})
    .then(todo => {
      console.log('PUT request', todos)
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

module.exports = router
