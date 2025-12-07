const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please login!");
    }
    const decodedMessage = await jwt.verify(token, "mad@Louis$1");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      return res.send("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
