require('dotenv').config() // 將 dotenv 讀取到環境變數中

const { getenv } = require('./libs/helper')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const liffRouter = require('./routes/liff')
const trendRouter = require('./routes/trend')

const app = express()
app.locals.NODE_ENV = getenv('NODE_ENV', 'development')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use('/webhook', require('./line')) // 需要在 express.json() 之前
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/trend', trendRouter)
app.use('/liff', liffRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
