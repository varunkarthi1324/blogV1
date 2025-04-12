const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config.json"); // Load the config.json file
const UserAuth = require("../models/UserAuth"); // Import the UserAuth model
const router = express.Router(); // Initialize the router

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the user without manually hashing the password
    const user = await UserAuth.create({
      name,
      email,
      password, // let the pre-save hook handle hashing
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ error: error.message });
  }
});
// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
