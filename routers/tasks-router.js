const {
  getAllTasks,
  getTaskById,
  updateTaskById,
  eraseTaskById,
  addTask,
} = require("../controllers/tasks.controllers");

const tasksRouter = require("express").Router();

tasksRouter.route("/").get(getAllTasks).post(addTask);

tasksRouter
  .route("/:id")
  .get(getTaskById)
  .patch(updateTaskById)
  .delete(eraseTaskById);

module.exports = tasksRouter;
