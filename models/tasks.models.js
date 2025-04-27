const { log } = require("console");
const db = require("../db/connection");

exports.fetchAllTasks = () => {
  return db.query("SELECT * FROM tasks");
};

exports.insertTask = ({ title, description, status, due_date }) => {
  return db
    .query(
      `INSERT INTO tasks (
          title,
          description,
          status,
          due_date
      ) VALUES 
          ($1, $2, $3, $4) 
      RETURNING *;`,
      [title, description, status, due_date]
    )
    .then(({ rows }) => rows[0]);
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

exports.deleteTaskById = (id) => {
  return db
    .query(
      `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
    `,
      [id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: `No task found for ID: ${id}`,
        });
      }
      return result;
    });
};
