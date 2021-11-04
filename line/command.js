const mysql = require("./sql")
const { liffUrl } = require('../libs/helper')

module.exports = async (ctx, next) => {
    const { event } = ctx;
    if (event.message?.type !== "text") return await next();

    const text = event.message?.text || "";
    var token = text.replace(/(^[\s]*)|([\s]*$)/g, "").split(/\ +/);

    if (token[0] === "follow" || token[0] === "追蹤") {
        if(token.length > 1 && token.length < 12){
            var query = "";
            for (var i = 1; i < token.length; i++) {
                query = "CALL UserKeywordInsert('" + event.source?.userId
                + "', '" + token[i] + "'); ";
                mysql.query(query, function(res) {});
            }
            event.replyMessage({ type: "text", text: "新增完成"});
        }else if(token.length >= 12){
            await event.replyMessage({ type: "text", text: "最多輸入 10 個參數！" });
        }else{
            await event.replyMessage({ type: "text", text: "請輸入欲追蹤的商品關鍵字，並以空格分隔。" });
        }
    }else if (token[0] === "unfollow" || token[0] === "退追") {
        if(token.length > 1 && token.length < 12){
            var query = "";
            for (var i = 1; i < token.length; i++) {
                query = "CALL UserKeywordDelete('" + event.source?.userId
                + "', '" + token[i] + "'); ";
                mysql.query(query, function(res) {});
            }
            event.replyMessage({ type: "text", text: "刪除完成"});
        }else if(token.length >= 12){
            await event.replyMessage({ type: "text", text: "最多輸入 10 個參數！" });
        }else{
            await event.replyMessage({ type: "text", text: "請輸入欲取消追蹤的商品關鍵字，並以空格分隔。" });
        }
    }else if (token[0] === "trend" || token[0] === "文字雲") {
        await event.replyMessage({ type: 'text', text: liffUrl('tall', 'trend') })
        //await event.replyMessage({ type: 'text', text: 'https://home.exodus.tw:3001/trend' })
    }else if (token[0] === "QA") {
        await event.replyMessage({ type: "text", text: "User issued command: qa" });
    }else if (token[0] === "查詢") {
        mysql.query("CALL UserKeywordInquire('" + event.source?.userId + "'); ", function(res) {

        });
    }else if(token[0] === "/getuid") {
        await event.replyMessage({ type: "text", text: "user id: " + event.source?.userId });
    }else if(token[0] === "/getrid") {
        await event.replyMessage({ type: "text", text: "room id: " + event.source?.roomId });
    }else if(token[0] === "/sqltest") {
        mysql.query('SELECT 123 AS a', function(res) {
            event.replyMessage({ type: "text", text: "RETURN: " + res[0].a});
        });
    }else if(token[0] === "/trend") {
        await event.replyMessage({ type: 'text', text: 'https://home.exodus.tw:3001/trend' })
    }else{
        return await next()
    }
};
