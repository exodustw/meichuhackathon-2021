const line = require('@line/bot-sdk')
const { getenv } = require('./helper')

const config = {
  channelAccessToken: getenv('LINEOA_ACCESS_TOKEN'),
  channelSecret: getenv('LINEOA_SECRET'),
}

try {
  exports.line = new line.Client(config)
  exports.middleware = line.middleware(config)
} catch (err) {
  console.log('請設定 LINEOA_ACCESS_TOKEN 與 LINEOA_SECRET')
}
