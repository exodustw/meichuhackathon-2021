module.exports = async (ctx, next) => {
  const { event } = ctx;
  await event.replyMessage({ type: "text", text: "We can't handle this!" });
};
