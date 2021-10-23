require("./sql");

module.exports = async (ctx, next) => {
    const { event } = ctx;
    if (event.message?.type !== "text") return await next();

    const text = event.message?.text || "";
    if (text === "追蹤") {
        await event.replyMessage({ type: "text", text: "User issued command: follow" });
    }else if(text === "/getuid") {
        await event.replyMessage({ type: "text", text: "user id: " + event.source?.userId });
    }else if(text === "/getrid") {
        await event.replyMessage({ type: "text", text: "room id: " + event.source?.roomId });
    }else if(text === "/gettmp") {
        await event.replyMessage({ type: "text", text: "tmp: " + tmp });
    }else if(text === "/addtmp") {
        tmp += 1;
        await event.replyMessage({ type: "text", text: "User issued command: addtmp"});
    }else{
        return await next()
    }
};
