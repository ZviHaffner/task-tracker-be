const db = require("../db/connection");

exports.fetchAllTasks = () => {
  return db.query("SELECT * FROM tasks");
};
