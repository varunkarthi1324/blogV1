const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  email: { type: String, required: true, unique: true }, // This email should match the one in UserAuth
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
