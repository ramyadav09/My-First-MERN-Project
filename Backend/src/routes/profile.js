const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  validateEditUser,
  validateChangePassword,
} = require("../utils/validate");
const bcrypt = require("bcrypt");

//get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditUser(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName}, your profile has been updated`,
      loggedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const allowedFields = ["currentPassword", "newPassword"];

    // validate fields
    const isAllowed = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );
    if (!isAllowed) {
      return res.status(400).send("Invalid edit request");
    }

    const { currentPassword, newPassword } = req.body;

    // check current password
    const isPasswordValid = await req.user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(400).send("Current password is incorrect");
    }

    // avoid same password reuse
    if (currentPassword === newPassword) {
      return res
        .status(400)
        .send("New password cannot be the same as current password");
    }

    // validate new password rules
    validateChangePassword(newPassword);

    // hash new password and save
    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();

    res.send({ message: "Your password has been changed." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = profileRouter;
