const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt for password encryption
const connectDB = require("./config/database"); // Correct the typo "connetDB" to "connectDB"
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

// SugnUp API
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // Validate signup data from the request body

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10); // Password encryption using bcrypt
    console.log(hashedPassword);

    // Creating a new instance of the user model
    const user = new User({
      // Changed "user" to "User" as it's a model, model should start with an uppercase
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    // Save user to the database
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message); // Updated error handling with status code
  }
});

// Login API
app.post("/login", async (req, res) => {
  // Changed from GET to POST
  try {
    const { emailId, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials"); // Returning response instead of throwing error
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token

      const token = await jwt.sign({ _id: user._id }, "Dev@tinder$21");
      // Add the token to the cookie and send response to the user
      res.cookie("token", token);
      res.send("Logged in successfully");
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookie;

    const { token } = cookie;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decodeMessage = await jwt.verify(token, "Dev@tinder$21");
    const _id = decodeMessage;

    const user = new User.findById(_id);
    if (!user) {
      throw new Error("Invalid user");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Get All Users Data
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

// Delete The User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

// Update The User
app.patch("/user/:userId", async (req, res) => {
  // Corrected the route by adding colon before ":userId"
  const userId = req.params.userId;
  const data = req.body;
  console.log(data);

  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid updates");
  }

  if (data?.skills?.length > 10) {
    // Safely check if skills exist before validating
    return res.status(400).send("Skills must be less than 10");
  }

  try {
    await User.findByIdAndUpdate(userId, data, { new: true });
    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

// Database connection
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
