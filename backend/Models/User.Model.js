// Importing mongoose to define schema and create model
import mongoose from "mongoose";

// Defining the schema for the users collection
const userSchema = mongoose.Schema({
  // Full name of the user (required)
  fullname: {
    required: true,
    type: String,
  },

  // Email address of the user (required)
  email: {
    required: true,
    type: String,
  },

  // Hashed password of the user (required)
  password: {
    required: true,
    type: String
  },

  // URL or path of the user's profile picture
  profilepic: {
    type: String
  },

  // Array to store IDs or references of channels the user is active in
  activeChannels: {
    type: []
  }
});

// Creating the User model using the defined schema
const userModel = mongoose.model("users", userSchema);

// Exporting the User model for use in other parts of the application
export default userModel;
