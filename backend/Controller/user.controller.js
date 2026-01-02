import bcrypt from "bcrypt";
import userModel from "../Models/User.Model.js";
import jwt from "jsonwebtoken"

export async function registeruser(req, res) {
  try {
    const { email, password, fullname } = req.body;

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // image to URL
    const profilepic = req.file
      ? `http://localhost:8085/uploads/profilepics/${req.file.filename}`
      : null;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      profilepic
    });

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
    res.status(500).json({ error: err.message });
  }
}




export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secretkey",
      { expiresIn: "1d" }
    );

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
    res.status(500).json({ error: err.message });
  }
}