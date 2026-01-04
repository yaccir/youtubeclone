// Importing bcrypt for hashing and comparing passwords securely
import bcrypt from "bcrypt";

// Importing User model to interact with users collection in the database
import userModel from "../Models/User.Model.js";

// Importing jsonwebtoken to generate authentication tokens
import jwt from "jsonwebtoken";

// Controller function to handle user registration
export async function registeruser(req, res) {
  try {
    // Extracting required user details from the request body
    const { email, password, fullname } = req.body;

    // Checking if a user with the given email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // If a profile picture is uploaded, generate its public URL
    // If no file is uploaded, set profile picture as null
    const profilepic = req.file
      ? `http://localhost:8085/uploads/profilepics/${req.file.filename}`
      : null;

    // Hashing the user's password using bcrypt with salt rounds
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Creating a new user record in the database
    const newUser = await userModel.create({
      fullname,               // User's full name
      email,                  // User's email address
      password: hashedPassword, // Hashed password for security
      profilepic              // Profile picture URL
    });

    // Sending success response with non-sensitive user details
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilepic: newUser.profilepic
      }
    });
  } catch (err) {
    // Handling server or database errors during registration
    res.status(500).json({ error: err.message });
  }
}

// Controller function to handle user login
export async function login(req, res) {
  try {
    // Extracting login credentials from the request body
    const { email, password } = req.body;
    console.log("here")
    console.log(req.body)

    // Finding user by email in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Comparing provided password with stored hashed password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
 

    // Generating a JWT token with user ID and email as payload
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      "secretkey11",
      { expiresIn: "1d" }
    );

       console.log(token)
    // Sending success response with token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic
      }
    });
  } catch (err) {
    // Handling unexpected errors during login
    res.status(500).json({ error: err.message });
  }
}
