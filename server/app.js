const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const config = require('./config')
const data = require('./data/data')

require('./db')

app.listen(config.port, () => {
  console.log(`Things get better. Server running at port: ${config.port}`)
})

// added for development
app.get('/favicon.ico', function (req, res) {
  res.status(204)
})

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../docs/index.html'))
})

app.get('/index.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, `../docs/index.js`))
})

app.get('/file/:cat/:file', function (req, res) {
  res.sendFile(path.resolve(__dirname, `../docs/assets/${req.params.cat}/${req.params.file}`))
})

app.use(bodyParser.json())

app.use('/api/v1', data)

// error handling
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  if (error) {
    console.log(error)
    return res.status(400).json({error})
  }
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
