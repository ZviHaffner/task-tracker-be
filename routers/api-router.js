const tasksRouter = require("./tasks-router");

const apiRouter = require("express").Router();

apiRouter.use("/tasks", tasksRouter);

module.exports = apiRouter;