const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Address.");
  } else if (
    !validator.isStrongPassword(password) ||
    password.length < 6 ||
    password.length > 50
  ) {
    throw new Error("Password is not strong enough.");
  }
};

const validateEditUser = (req) => {
  // const { firstName, lastName, gender, age, skills } = req.body;
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "age",
    "skills",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const validateChangePassword = (password) => {
  if (
    !validator.isStrongPassword(password) ||
    password.length < 6 ||
    password.length > 50
  ) {
    throw new Error("Password is not strong enough.");
  }
};
module.exports = {
  validateSignUpData,
  validateEditUser,
  validateChangePassword,
};
