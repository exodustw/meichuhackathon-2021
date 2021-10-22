const _ = require("lodash");
const { middleware } = require("../libs/line");
const { middlewareCompose } = require("../libs/helper");
const debug = require("../libs/debug")(__filename);
const express = require("express");
const router = express.Router();

// 每個 event 的處理順序
const eventHandler = middlewareCompose([
  require("./event-init"),
  require("./liff-url"),
  require("./echo-text"),
  require("./follow")
]);

if (middleware) {
  router.post("/", middleware, async (req, res) => {
    try {
      const events = _.get(req, "body.events", []);
      await Promise.all(_.map(events, (event) => eventHandler({ event, req })));
      res.json({});
    } catch (err) {
      debug(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  });
}

module.exports = router;
