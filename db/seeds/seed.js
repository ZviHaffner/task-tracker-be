const format = require("pg-format");
const db = require("../connection");

const seed = (tasksData) => {
  return db
    .query(`DROP TABLE IF EXISTS tasks;`)
    .then(() => {
      return db.query(`
        CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) NOT NULL,
          due_date TIMESTAMP
        );
      `);
    })
    .then(() => {
      const formattedTasksData = tasksData.map((task) => {
        const taskCopy = { ...task };
        if (taskCopy.due_date) {
          taskCopy.due_date = new Date(taskCopy.due_date).toISOString();
        }
        return taskCopy;
      });

      const insertTasksQueryStr = format(
        `INSERT INTO tasks (title, description, status, due_date) VALUES %L RETURNING *;`,
        formattedTasksData.map(({ title, description, status, due_date }) => [
          title,
          description || null,
          status,
          due_date,
        ])
      );

      return db.query(insertTasksQueryStr);
    });
};

module.exports = seed;
