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
    "CREATE TABLE IF NOT EXISTS users (id integer primary key, email text not null, password text not null)";
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
