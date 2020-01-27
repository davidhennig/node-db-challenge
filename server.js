const express = require("express");
const router = require("./router.js");
const server = express();
server.use(express.json());
server.use(logger);
server.get("/", (req, res) => {
  res.send("<h2>Server up and running</h2>");
});
server.use("/api/projects", router);
function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} at ${Date.now()}`);

  next();
}
module.exports = server;
