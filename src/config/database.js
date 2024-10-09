const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ParmDev:ParmDev21@dev.c30en.mongodb.net/techtender"
  );
};

module.exports = connectDB;