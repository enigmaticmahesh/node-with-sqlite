const sqlite3 = require("sqlite3");
const { DB_NAME } = require("./app.config");
const {
  createUsersTableQuery,
  createApartmentsTableQuery,
} = require("./queries");

const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database(DB_NAME);

const sqliteWrapper = (command, method = "all", params = []) => {
  return new Promise((resolve, reject) => {
    db[method](command, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const createTables = async () => {
  const method = "run";
  try {
    await sqliteWrapper(createUsersTableQuery, method);
    await sqliteWrapper(createApartmentsTableQuery, method);
  } catch (error) {
    console.log("Error while creating Tables: ", error);
  }
};

const setupDatabase = () => {
  createTables();
};

module.exports = { sqliteWrapper, setupDatabase };
