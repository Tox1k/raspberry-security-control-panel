require('./config/env/env')

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

// VARS
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'
const { version, author } = require('../package.json')
process.env.root = __dirname

// Middleware
const error = require('./middlewares/error')

// INIT
const app = express()

if (env === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

app.use(cors({
  origin: true,
  credentials: true,
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.options('*', cors())

app.use((req, res, next) => {
  req.messages = []
  next()
})

// Routes
app.use('/api', require('./routes/api/api'))

app.get('/', (req, res) => {
  res.status(200).json({
    title: 'Safe',
    version,
    author,
    legal: 'This project is licensed under the MIT License.'
  })
})

app.use(error())

app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
