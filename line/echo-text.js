module.exports = async (ctx, next) => {
  const { event } = ctx;
  if (event.message?.type !== "text") return await next();

  const text = event.message?.text || "";
  await event.replyMessage({ type: "text", text: "echo " + text });
};
