const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  _id: Number,
  content: String,
  isDone: Boolean,
  isSelected: Boolean
 }, { _id: false })

module.exports = mongoose.model('Todo', todoSchema)
