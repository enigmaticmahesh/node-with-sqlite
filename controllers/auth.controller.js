const sqliteWrapper = require("../db");

exports.login = (req, res) => {
  res.status(200).json({
    message: "Logging in User",
  });
};
