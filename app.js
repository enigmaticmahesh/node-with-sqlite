const express = require("express");
const { setupDatabase } = require("./db");

const authRoutes = require("./routes/auth.route");

const app = express();

setupDatabase();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Server",
  });
});

module.exports = app;
