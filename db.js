const sqlite3 = require("sqlite3");

const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database("./backend.db");

const sqliteWrapper = (command, method = "all") => {
  return new Promise((resolve, reject) => {
    db[method](command, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const createUsersTable = async () => {
  const createUsersTableQuery =
    "CREATE TABLE IF NOT EXISTS users (email text, password text)";
  const method = "run";
  try {
    await sqliteWrapper(createUsersTableQuery, method);
  } catch (error) {
    console.log("Error while creating Users Table: ", error);
  }
};

const setupDatabase = () => {
  createUsersTable();
};

module.exports = { sqliteWrapper, setupDatabase };
