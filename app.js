const express = require("express");
const { setupDatabase } = require("./db");

const app = express();

setupDatabase();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Server",
  });
});

module.exports = app;
