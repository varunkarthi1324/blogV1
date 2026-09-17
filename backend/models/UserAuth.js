const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;

// Define the UserAuth schema
const userAuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    match: [
      passwordRegex,
      "Password must be 8-20 characters and include an uppercase letter, lowercase letter, number, and special character.",
    ],
  },
});

// Pre-save hook to hash the password before saving
userAuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Export the model
module.exports = mongoose.model("UserAuth", userAuthSchema);
