import userModel from "../Models/User.Model.js";
import jwt from "jsonwebtoken";

export async function userprofile(req, res) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, "secretkey11");

    // Extract email from token
    const email = decoded.email;

    // Fetch user
    const userdata = await userModel.findOne({ email });
        
    console.log(userdata)


    if (!userdata) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send profile pic
    res.status(200).json( userdata);

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
