import mongoose from "mongoose";
// Importing the database URI from environment configuration
import { DB_URI } from "./env.js";

// Exit early if the environment variable is missing
if (!DB_URI) {
  console.error("❌ DB_URI is not defined in the environment variables.");
  process.exit(1);
}

// Asynchronous function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    // Attempt to connect to the database using the provided URI
    await mongoose.connect(DB_URI);
    console.log("💽 Connected to DataBase");
  } catch (error) {
    // Log error message if connection fails
    console.log("Error connecting to Database");
    console.log(error);

    // Exit the process with a failure code
    process.exit(1);
  }
};

export default connectToDatabase;
