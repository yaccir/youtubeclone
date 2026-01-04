// Importing jsonwebtoken to verify JWT tokens for authentication
import jwt from "jsonwebtoken";

// Importing Channel model to fetch channel data from the database
import channelModel from "../Models/Channel.model.js";

// Controller function to handle viewing a single channel page
export async function channelviewpage(req, res) {
  try {
    // Reading the Authorization header from the request
    const authHeader = req.headers.authorization;

    // If Authorization header is missing, deny access
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Extracting the token part from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verifying the JWT token using the secret key
    // If token is invalid or expired, jwt.verify will throw an error
    jwt.verify(token, "secretkey11");

    // Extracting channel ID from route parameters
    const { id } = req.params;

    // Logging channel ID for debugging purposes
    console.log(id);

    // Fetching the channel document from the database using channel ID
    const channelpage = await channelModel.findById(id);

    // If no channel is found with the given ID, return 404 response
    if (!channelpage) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Sending successful response with channel data
    res.status(200).json({
      success: true,
      channel: channelpage
    });

  } catch (error) {
    // Handling any errors such as token verification failure or database issues
    res.status(500).json({
      success: false,
      message: "Failed to load channel",
      error: error.message
    });
  }
}
