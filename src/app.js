const express = require("express");
const connetDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating New Instance
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.send("Something Went Wrong" + error.message);
  }
});

// Get All Users Data

app.get("/user", async (req, res) => {
  try {
    const Users = await User.find({});
    res.send("Users Registered successfully");
  } catch (error) {
    res.send("Something Went Wrong" + error.message);
  }
});

// Delete The User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const Users = await User.findByIdAndDelete(userId);
    res.send("Users deleted Successfully");
  } catch (error) {
    res.send("Something Went Wrong" + error.message);
  }
});

// Update The User
app.patch("/user:userId", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(data);

  const ALLOWED_UPDTAES = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDTAES.includes(k)
  );
  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid Updates");
  }
  if (data?.skills.length > 10) {
    throw new Error("Skills must be at least 10");
  }

  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("Users Updated Successfully");
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
