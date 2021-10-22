const _ = require('lodash')

/**
 * 取得 process.env.[key] 的輔助函式，且可以有預設值
 */
exports.getenv = (key, defaultval) => {
  return _.get(process, ['env', key], defaultval)
}

exports.middlewareCompose = (middleware) => {
  // 型態檢查
  if (!_.isArray(middleware)) { throw new TypeError('Middleware stack must be an array!') }
  if (_.some(middleware, (fn) => !_.isFunction(fn))) { throw new TypeError('Middleware must be composed of functions!') }

  return async (context, next) => {
    const cloned = [...middleware, ...(_.isFunction(next) ? [next] : [])]
    const executed = _.times(cloned.length + 1, () => 0)
    const dispatch = async (cur) => {
      if (executed[cur] !== 0) { throw new Error(`middleware[${cur}] called multiple times`) }
      if (cur >= cloned.length) {
        executed[cur] = 2
        return
      }
      try {
        executed[cur] = 1
        const result = await cloned[cur](context, () => dispatch(cur + 1))
        if (executed[cur + 1] === 1) { throw new Error(`next() in middleware[${cur}] should be awaited`) }
        executed[cur] = 2
        return result
      } catch (err) {
        executed[cur] = 3
        throw err
      }
    }
    return await dispatch(0)
  }
}

exports.errToJSON = (() => {
  const ERROR_KEYS = [
    'message',
    'address',
    'args',
    'code',
    'data',
    'dest',
    'errno',
    'info',
    'name',
    'originalError.response.data',
    'originalError.response.headers',
    'originalError.response.status',
    'path',
    'port',
    'reason',
    'response.data',
    'response.headers',
    'response.status',
    'stack',
    'status',
    'statusCode',
    'statusMessage',
    'syscall',
  ]
  return (err) => _.pick(err, ERROR_KEYS)
})()

exports.sleep = (t) => new Promise((resolve) => setTimeout(resolve, t))

exports.liffUrl = (() => {
  const LIFFID = {
    full: exports.getenv('LIFFID_FULL'),
    tall: exports.getenv('LIFFID_TALL'),
    compact: exports.getenv('LIFFID_COMPACT'),
  }
  return (size, path, params = {}) => {
    if (!LIFFID[size]) throw new Error('invalid liff size')
    if (!/^([A-Za-z0-9_-]+)$/.test(path)) throw new Error('invalid liff path')
    const url = new URL(`https://liff.line.me/${LIFFID[size]}/${path}`)
    _.each(params, (val, key) => {
      url.searchParams.set(key, val)
    })
    return url.href
  }
})()
