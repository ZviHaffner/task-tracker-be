const db = require("../db/connection");

exports.fetchAllTasks = () => {
  return db.query("SELECT * FROM tasks");
};

exports.fetchTaskById = (id) => {
  return db
    .query("SELECT * FROM tasks WHERE id = $1", [id])
    .then(({ rows }) => {
      const task = rows[0];
      if (!task) {
        return Promise.reject({
          status: 404,
          msg: `No task found for ID: ${id}`,
        });
      }
      return task;
    });
};
