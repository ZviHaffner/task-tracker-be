const { getAllEndpoints } = require("../controllers/api.controllers");
const tasksRouter = require("./tasks-router");

const apiRouter = require("express").Router();

apiRouter.route("/").get(getAllEndpoints);

apiRouter.use("/tasks", tasksRouter);

module.exports = apiRouter;
