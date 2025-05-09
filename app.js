const express = require("express");
const cors = require('cors');
const apiRouter = require("./routers/api-router");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
