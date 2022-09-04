exports.DB_NAME = process.env.DB_NAME;
exports.PWD_SALT = process.env.PWD_SALT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || "1h";
exports.PORT = 5001 || process.env.PORT;
