const _ = require('lodash')
const { line } = require('../libs/line')
const debug = require('../libs/debug')(__filename)

module.exports = async (ctx, next) => {
  const { event } = ctx

  // line sdk
  ctx.line = line

  // 回傳訊息
  event.replyMessage = async messages => {
    const replyToken = event?.replyToken
    if (!replyToken) return
    delete event.replyToken
    await line.replyMessage(replyToken, messages)
  }

  // 避免 Error 被丟到更外層
  try {
    await next() // 繼續執行接下來的 middleware
  } catch (err) {
    // 嘗試取得 line sdk 及 axios 的錯誤
    err.message = err.originalError?.response?.data?.message ?? err.response?.data?.message ?? err.message
    _.set(err, 'data.event', event)
    debug('err = %j', err)
    await event.replyMessage({ type: 'text', text: err.message })
  }
}
