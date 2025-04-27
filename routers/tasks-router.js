const {
  getAllTasks,
  getTaskById,
  updateTaskById,
  eraseTaskById,
} = require("../controllers/tasks.controllers");

const tasksRouter = require("express").Router();

tasksRouter.route("/").get(getAllTasks);

tasksRouter
  .route("/:id")
  .get(getTaskById)
  .patch(updateTaskById)
  .delete(eraseTaskById);

module.exports = tasksRouter;
