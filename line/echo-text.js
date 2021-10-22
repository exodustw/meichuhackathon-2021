module.exports = async (ctx, next) => {
  const { event } = ctx;
  if (event.message?.type !== "text") return await next();

  const text = event.message?.text || "";
  if (text === "Hello") {
    await event.replyMessage({ type: "text", text: "Hello! User!" });
  } else if (text === "去你媽") {
    await event.replyMessage({ type: "text", text: "奶酪！" });
  } else if (text === "主辦單位可不可以管一下") {
    await event.replyMessage({
      type: "text",
      text: "這個人到底在叫什麼叫阿！"
    });
  } else if (text === "畫面很亂") {
    await event.replyMessage({ type: "text", text: "222222222" });
  } else {
    await event.replyMessage({
      type: "text",
      text: "對不起，程式目前無法處理這個訊息"
    });
  }
};
