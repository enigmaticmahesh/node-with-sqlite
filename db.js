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

const createTables = async () => {
  const createUsersTableQuery =
    "CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, email text not null, password text not null)";
  const createApartmentsTableQuery =
    "CREATE TABLE IF NOT EXISTS apartments (id integer primary key autoincrement, owner integer not null references users(id), size text not null, rooms text not null, address text not null, rent integer not null, deposit integer not null)";
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
