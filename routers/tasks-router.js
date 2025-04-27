const { getAllTasks } = require("../controllers/tasks.controllers");

const tasksRouter = require("express").Router();

tasksRouter.route("/").get(getAllTasks);

module.exports = tasksRouter;
