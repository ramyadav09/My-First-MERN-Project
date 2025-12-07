const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ramyadav2060:VAbZSokTAeajG2j3@nodejs.a67pm45.mongodb.net/devTinder"
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
