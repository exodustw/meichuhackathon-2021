const _ = require('lodash')
const { errToJSON } = require('./helper')
const debug = require('debug')
const path = require('path')

const APP_DIRNAME = path.resolve(__dirname, '../')

module.exports = filename => {
  const namespace = path.relative(APP_DIRNAME, filename).replace(/\.[a-zA-Z0-9]+$/, '').replace(/\\/g, '/')
  const logDebug = debug(`app:${namespace}`)
  return (...args) => logDebug(..._.map(args, arg => arg instanceof Error ? errToJSON(arg) : arg))
}
