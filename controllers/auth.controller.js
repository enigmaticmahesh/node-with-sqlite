const bcrypt = require("bcrypt");
const { sqliteWrapper } = require("../db");

exports.login = (req, res) => {
  res.status(200).json({
    message: "Logging in User",
  });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = `INSERT INTO users VALUES (NULL, "${email}", "${hashedPassword}")`;
    const method = "run";
    const user = await sqliteWrapper(createUserQuery, method);
    res.status(200).json({
      message: "Register User",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while registering. Please, try again",
      error,
    });
  }
};
