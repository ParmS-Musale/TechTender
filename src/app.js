const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/user/login", (req, res, next) => {
  console.log("login Succesful");
  res.send("UserLogged in successfully");
});

app.use("/user/data", adminAuth, (req, res, next) => {
  console.log("New Data Added");

  res.send("Data Added");
  next();
});

app.use("/user/delete", (req, res) => {
  res.send("Delete user");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
