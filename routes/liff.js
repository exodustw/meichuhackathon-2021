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
    const match = req.path.match(/^\/(full|tall|compact)\/([A-Za-z0-9_-]*)$/)
    if (!match) throw createError(404)

    const [, size, filename] = match
    res.locals.liffid = LIFFID[size]

    res.render(`liff/${filename || 'index'}`)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
