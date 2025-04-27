const { fetchAllTasks } = require("../models/tasks.models");

exports.getAllTasks = (req, res) => {
  fetchAllTasks().then(({ rows }) => {
    res.status(200).send({ tasks: rows });
  });
};
