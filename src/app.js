const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt for password encryption
const connectDB = require("./config/database"); // Correct the typo "connetDB" to "connectDB"
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json());
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
      res.send("Logged in successfully");
    } else {
      return res.status(400).send("Invalid Credentials"); // Same error response for security reasons
    }
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message); // Updated error handling
  }
});

// Get All Users Data
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({}); // Changed "Users" to lowercase to follow variable naming convention
    res.json(users); // Send users data in JSON format
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message); // Updated error handling
  }
});

// Delete The User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId); // Corrected deletion logic, removed unnecessary "Users" variable
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message); // Updated error handling
  }
});

// Update The User
app.patch("/user/:userId", async (req, res) => {
  // Corrected the route by adding colon before ":userId"
  const userId = req.params.userId; // Use req.params to get userId from the URL path
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
    return res.status(400).send("Skills must be less than 10"); // Corrected message
  }

  try {
    await User.findByIdAndUpdate(userId, data, { new: true }); // Added { new: true } to return the updated document
    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message); // Updated error handling
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
