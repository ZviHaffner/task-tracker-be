const { getAllTasks, getTaskById } = require("../controllers/tasks.controllers");

const tasksRouter = require("express").Router();

tasksRouter.route("/").get(getAllTasks);

tasksRouter.route("/:id").get(getTaskById);

module.exports = tasksRouter;
