const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validate");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //validating the data
    validateSignUpData(req);

    //encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid username or password");
    } else {
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        //generating jwt token
        const token = await user.getJWT();

        //adding token to user
        res.cookie("token", token);
        res.send(user);
      } else {
        throw new Error("Password is incorrect");
      }
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("Logout Successful!!");
});

module.exports = authRouter;
