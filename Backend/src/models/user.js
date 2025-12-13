const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address.");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      // validate(value) {
      //   if (!validator.isURL(value)) {
      //     throw new Error("URL is invalid!");
      //   }
      // },
    },
    age: {
      type: Number,
      max: 100,
      min: 18,
    },
    gender: {
      type: String,
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Invalid gender");
      //   }
      // },
      enum: ["male", "female", "other"],
    },
    skills: {
      type: [String],
      maxlength: 100,
    },
    skills: {
      type: [String],
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "mad@Louis$1", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  const hashPassword = user.password;
  const isPasswordValid = await bcrypt.compare(passwordByUser, hashPassword);
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
