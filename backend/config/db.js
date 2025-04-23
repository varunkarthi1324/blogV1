require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the main blog database (blogDB)
const connectMainDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Main MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to main DB: ${error.message}`);
    process.exit(1);
  }
};

// Connect to the user authentication database (authDB)
const connectAuthDB = async () => {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI);
    console.log(`Auth MongoDB Connected: ${conn.host}`);
    return conn; // Return the connection object for the user authentication model
  } catch (error) {
    console.error(`Error connecting to auth DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectMainDB, connectAuthDB };
