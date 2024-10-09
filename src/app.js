const express = require("express");
const connetDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Narendra",
    lastName: "Modi",
    emailId: "bjp@example.com",
    password: "Meloni@123",
  });

  try {
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.send("Something Went Wrong" + error.message);
  }
});

connetDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
