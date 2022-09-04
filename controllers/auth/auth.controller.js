const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { PWD_SALT, JWT_EXPIRE_TIME, JWT_SECRET } = require("../../app.config");
const { sqliteWrapper } = require("../../db");
const { createUserQuery, getUserByEmailQuery } = require("../../queries");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(
    "🚀 ~ file: auth.controller.js ~ line 6 ~ password",
    validator.escape(password)
  );
  console.log("🚀 ~ file: auth.controller.js ~ line 6 ~ email", email);

  // If there is no password or email
  if (!email || !validator.isEmail(email) || !password) {
    res.status(400).json({
      message: "Invalid Email or Password. Please send proper details.",
    });
    return;
  }

  try {
    const user = await sqliteWrapper(getUserByEmailQuery, "get", [email]);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const isPwdMatched = await bcrypt.compare(password, user.password);
    if (!isPwdMatched) {
      res.status(400).json({
        message: "Invalid credentials. Please, try again",
      });
      return;
    }

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    res.status(200).json({
      message: "User login successfull",
      token,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.controller.js ~ line 41 ~ exports.login= ~ error",
      error
    );
    res.status(500).json({
      message: "Error while login. Please, try agaim later.",
      error,
    });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // If there is no password or email
  if (!email || !validator.isEmail(email) || !password) {
    res.status(400).json({
      message: "Invalid Email or Password. Please send proper details.",
    });
    return;
  }

  try {
    const oldUser = await sqliteWrapper(getUserByEmailQuery, "get", [email]);

    if (oldUser) {
      res.status(409).json({
        message: "User already exists. Please, try again",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, PWD_SALT);

    const user = await sqliteWrapper(createUserQuery, "run", [
      email,
      hashedPassword,
    ]);

    res.status(200).json({
      message: "Registration successfull",
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.controller.js ~ line 75 ~ exports.register= ~ error",
      error
    );
    res.status(500).json({
      message: "Error while registering. Please, try again",
      error,
    });
  }
};
