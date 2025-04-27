const { log } = require("console");
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

exports.updateStatusByTask = (newStatus, id) => {
  return db
    .query(
      `
      UPDATE tasks
      SET
        status = $1
      WHERE id = $2
      RETURNING *;`,
      [newStatus, id]
    )
    .then(({ rows }) => {
      const updatedTask = rows;
      if (!updatedTask.length) {
        return Promise.reject({
          status: 404,
          msg: `No task found for id: ${id}`,
        });
      }
      return updatedTask[0];
    });
};
