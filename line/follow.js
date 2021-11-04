module.exports = async (ctx, next) => {
  const { event } = ctx;
  if (event.type !== "follow") return await next();
  await event.replyMessage({
    type: "text",
    text: "歡迎使用清交二手大拍賣XD通知小幫手！請點下方選單進入教學"
  });
};
