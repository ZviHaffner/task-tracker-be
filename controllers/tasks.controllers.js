const { fetchAllTasks, fetchTaskById } = require("../models/tasks.models");

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
