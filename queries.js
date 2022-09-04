// ----------- SERVER INITIALIZATION QUERIES -------------
exports.createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, email text not null, password text not null)`;
exports.createApartmentsTableQuery = `CREATE TABLE IF NOT EXISTS apartments (id integer primary key autoincrement, owner integer not null references users(id), size text not null, rooms text not null, address text not null, rent integer not null, deposit integer not null)`;

// ----------- USERS TABLE QUERIES -------------
// NULL will make the ID autoincrement as it was set while creating it.
exports.createUserQuery = `INSERT INTO users VALUES (NULL, ?, ?)`;
exports.getUserByEmailQuery = `SELECT * FROM users WHERE email=?`;
