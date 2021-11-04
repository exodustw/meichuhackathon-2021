const express = require('express')
const router = express.Router()
const { getenv } = require('../libs/helper')
const createError = require('http-errors')

const LIFFID = {
  full: getenv('LIFFID_FULL'),
  tall: getenv('LIFFID_TALL'),
  compact: getenv('LIFFID_COMPACT'),
}

router.use('/', async (req, res, next) => {
    try {  
      res.render(`liff/trend`)
    } catch (err) {
      return next(err)
    }
  })
  
  module.exports = router