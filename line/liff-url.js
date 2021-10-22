const { liffUrl } = require('../libs/helper')

module.exports = async (ctx, next) => {
  const { event } = ctx
  const text = event.message?.text || ''
  const match = text.match(/^\/liff (full|tall|compact) ([A-Za-z0-9_-]+)$/)
  if (!match) return await next()
  await event.replyMessage({ type: 'text', text: liffUrl(match[1], match[2]) })
}
