// Importing Channel model to access channel data from the database
import channelModel from "../Models/Channel.model.js";

// Importing jsonwebtoken to verify and decode JWT tokens
import jwt from "jsonwebtoken";

// Controller function to fetch all channels created by the authenticated user
export async function getchannel(req, res) {
  try {
    // Reading the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    // If Authorization header is not present, deny access
    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Extracting the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verifying the JWT token and decoding its payload
    // This provides access to user details such as email
    const decoded = jwt.verify(token, "secretkey11");

    // Querying the database to find all channels associated with the user's email
    const totalchannels = await channelModel.find({
      useremail: decoded.email
    });

    // Logging decoded email for debugging and verification
    console.log(decoded.email);

    // Sending the list of channels as the response
    res.status(200).json(totalchannels);

  } catch (err) {
    // Handling invalid or expired token errors
    res.status(401).json({
      message: "Invalid or expired token",
      error: err.message
    });
  }
}
