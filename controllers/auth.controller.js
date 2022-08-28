const sqliteWrapper = require("../db");

exports.login = (req, res) => {
  res.status(200).json({
    message: "Logging in User",
  });
};

exports.register = (req, res) => {
  res.status(200).json({
    message: "Register User",
  });
};
