const {
  getAllTasks,
  getTaskById,
  updateTaskById,
} = require("../controllers/tasks.controllers");

const tasksRouter = require("express").Router();

tasksRouter.route("/").get(getAllTasks);

tasksRouter.route("/:id").get(getTaskById).patch(updateTaskById);

module.exports = tasksRouter;
