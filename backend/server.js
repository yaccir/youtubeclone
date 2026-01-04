// Importing required packages
import express from "express";       // Express framework for server and routing
import mongoose from "mongoose";     // Mongoose for MongoDB connection
import { youtuberoutes } from "./Routes/youtuberoute.js"; // Importing all API routes
import cors from "cors";             // CORS middleware to handle cross-origin requests
import dotenv from "dotenv";         // For environment variable management

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the uploads directory (for videos, thumbnails, profile pics)
app.use("/uploads", express.static("uploads"));

// Define server port
const PORT = 8085;

// Connect to MongoDB using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/you')
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// Root route for testing
app.get("/", () => {
  console.log("Welcome to the root route");
});

// Register all routes from youtuberoutes function
youtuberoutes(app);
