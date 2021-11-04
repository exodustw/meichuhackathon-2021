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
            var str = "";
            for (var i = 1; i < token.length; i++) {
                query = "CALL UserKeywordInsert('" + event.source?.userId
                + "', '" + token
                [i] + "'); ";
                mysql.query(query, function(res) {});
                str += token[i] + " ";
            }
            event.replyMessage({
                "type": "flex",
                "altText": "新增的關鍵字：" + str,
                "contents": {
                        "type": "bubble",
                        "hero": {
                          "type": "image",
                          "size": "full",
                          "aspectRatio": "20:13",
                          "aspectMode": "cover",
                          "action": {
                            "type": "uri",
                            "uri": "http://linecorp.com/"
                          },
                          "url": "https://i.imgur.com/YEr3TQR.png"
                        },
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "太好了！\n已設定追蹤關鍵字",
                              "weight": "bold",
                              "size": "xl",
                              "wrap": true
                            },
                            {
                              "type": "box",
                              "layout": "vertical",
                              "margin": "lg",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "剛剛新增的關鍵字：",
                                      "color": "#888888",
                                      "size": "md",
                                      "wrap": true,
                                      "contents": []
                                    },
                                    {
                                      "type": "text",
                                      "color": "#666666",
                                      "size": "md",
                                      "wrap": true,
                                      "contents": [],
                                      "weight": "bold",
                                      "text": str
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    });
        }else if(token.length >= 12){
            await event.replyMessage({ type: "text", text: "最多輸入 10 個參數！" });
        }else{
            await event.replyMessage(
                {
                "type": "flex",
                "altText": "輸入你偏好的關鍵字，一出現就通知你！",
                "contents": {
                    "type": "bubble",
                    "hero": {
                      "type": "image",
                      "url": "https://i.imgur.com/9dxGTjX.jpg",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover",
                      "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                      }
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "輸入你偏好的關鍵字，\n一出現就通知你！",
                          "weight": "bold",
                          "size": "xl",
                          "wrap": true
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "lg",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "請依照以下格式輸入指令：",
                                  "color": "#888888",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": []
                                },
                                {
                                  "type": "text",
                                  "text": "追蹤 [關鍵字] ... [關鍵字]",
                                  "color": "#666666",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": [],
                                  "weight": "bold"
                                },
                                {
                                  "type": "text",
                                  "text": "其中關鍵字與關鍵字之間用空格分開，一次輸入上限為10個關鍵字。",
                                  "color": "#888888",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  }
                });
        }
    }else if (token[0] === "unfollow" || token[0] === "退追" || token[0] === "取消追蹤") {
        if(token.length > 1 && token.length < 12){
            var query = "";
            var str = "";
            for (var i = 1; i < token.length; i++) {
                query = "CALL UserKeywordDelete('" + event.source?.userId
                + "', '" + token[i] + "'); ";
                mysql.query(query, function(res) {});
                str += token[i] + " ";
            }
            event.replyMessage({
                "type": "flex",
                "altText": "已移除關鍵字：" + str,
                "contents":
                {
                    "type": "bubble",
                    "hero": {
                      "type": "image",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover",
                      "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                      },
                      "url": "https://i.imgur.com/YEr3TQR.png"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "已解除關鍵字",
                          "weight": "bold",
                          "size": "xl",
                          "wrap": true
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "lg",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "剛剛已移除關鍵字：",
                                  "color": "#888888",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": []
                                },
                                {
                                  "type": "text",
                                  "color": "#666666",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": [],
                                  "weight": "bold",
                                  "text": str
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  }
            });
        }else if(token.length >= 12){
            await event.replyMessage({ type: "text", text: "最多輸入 10 個參數！" });
        }else{
            await event.replyMessage(
                {
                "type": "flex",
                "altText": "輸入不想再追蹤的關鍵字，即刻解除！",
                "contents": {
                    "type": "bubble",
                    "hero": {
                      "type": "image",
                      "url": "https://i.imgur.com/9dxGTjX.jpg",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover",
                      "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                      }
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "輸入不想再追蹤的關鍵字，\n即刻解除！",
                          "weight": "bold",
                          "size": "xl",
                          "wrap": true
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "lg",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "請依照以下格式輸入指令：",
                                  "color": "#888888",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": []
                                },
                                {
                                  "type": "text",
                                  "text": "退追 [關鍵字] ... [關鍵字]",
                                  "color": "#666666",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": [],
                                  "weight": "bold"
                                },
                                {
                                  "type": "text",
                                  "text": "其中關鍵字與關鍵字之間用空格分開，一次輸入上限為10個關鍵字。",
                                  "color": "#888888",
                                  "size": "md",
                                  "wrap": true,
                                  "contents": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  }
                });
        }
    }else if (token[0] === "trend" || token[0] === "文字雲") {
        await event.replyMessage({ type: 'text', text: liffUrl('tall', 'trend') })
        //await event.replyMessage({ type: 'text', text: 'https://home.exodus.tw:3001/trend' })
    }else if (token[0] === "help" || token[0] === "教學") {
        /*await event.replyMessage({ type: "text", text: 
        "1. 輸入\"追蹤 [關鍵字] ... [關鍵字]\"設定追蹤商品關鍵字\n" + 
        "2. 設定 LINE Notify 以收到最新消息" });*/
        await event.replyMessage(
            {
            "type": "flex",
            "altText": "輸入不想再追蹤的關鍵字，即刻解除！",
            "contents": {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "size": "3xl",
                  "aspectRatio": "1:1",
                  "aspectMode": "cover",
                  "action": {
                    "type": "uri",
                    "uri": "http://linecorp.com/"
                  },
                  "url": "https://i.imgur.com/vG8OqIC.png"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "加入 LINE Notify\n以接收訂閱的關鍵字貼文",
                      "weight": "bold",
                      "size": "xl",
                      "wrap": true
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "lg",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "請將 LINE Notify 設為你的好友",
                              "color": "#888888",
                              "size": "md",
                              "wrap": true,
                              "contents": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "uri",
                        "label": "點我前往設定",
                        "uri": "https://home.exodus.tw:5000/notify?id=" + event.source?.userId
                      }
                    }
                  ]
                }
              }
            });
    }else if (token[0] === "查詢" || token[0] === "我的關鍵字") {
        mysql.query("CALL UserKeywordInquire('" + event.source?.userId + "'); ", function(res) {
            if(res[0] == null || res[0][0] == null || res[0][0]['keywords'] == null){
                event.replyMessage({ type: 'text', text: '你目前追蹤的關鍵字：\n(無)'});
            }else{
                event.replyMessage({ type: 'text', text: '你目前追蹤的關鍵字：\n' + res[0][0]['keywords'] });
            }
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
