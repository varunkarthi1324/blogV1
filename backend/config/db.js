const mongoose = require("mongoose");

// Connect to the main blog database (blogDB)
const connectMainDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vkvarunkarthikeyan:XHXLo6VL0IQHxbsX@cluster0.bnklpf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Main MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to main DB: ${error.message}`);
    process.exit(1);
  }
};

// Connect to the user authentication database (authDB)
const connectAuthDB = async () => {
  try {
    const conn = await mongoose.createConnection(
      "mongodb+srv://vkvarunkarthikeyan:XHXLo6VL0IQHxbsX@cluster0.bnklpf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Auth MongoDB Connected: ${conn.host}`);
    return conn; // Return the connection object for the user authentication model
  } catch (error) {
    console.error(`Error connecting to auth DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectMainDB, connectAuthDB };
