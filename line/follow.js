module.exports = async (ctx, next) => {
  const { event } = ctx;
  if (event.type !== "follow") return await next();
  await event.replyMessage({
    type: "text",
    text: "歡迎你！"
  });
};
