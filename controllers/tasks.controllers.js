const {
  fetchAllTasks,
  fetchTaskById,
  updateStatusByTask,
  deleteTaskById,
} = require("../models/tasks.models");

exports.getAllTasks = (req, res) => {
  fetchAllTasks().then(({ rows }) => {
    res.status(200).send({ tasks: rows });
  });
};

exports.getTaskById = (req, res, next) => {
  const { id } = req.params;
  fetchTaskById(id)
    .then((task) => {
      res.status(200).send({ task });
    })
    .catch(next);
};

exports.updateTaskById = (req, res, next) => {
  const { id } = req.params;
  const { new_status } = req.body;
  updateStatusByTask(new_status, id)
    .then((updatedTask) => {
      res.status(200).send({ updatedTask });
    })
    .catch(next);
};

exports.eraseTaskById = (req, res, next) => {
  const { id } = req.params;
  deleteTaskById(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
