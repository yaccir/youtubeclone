// Importing the Channel model to interact with the channels collection in the database
import channelModel from "../Models/Channel.model.js";

// Importing the User model (not directly used in this function)
import userModel from "../Models/User.Model.js";

// Controller function to handle channel creation
export async function createChannel(req, res) {
  try {
    // Extracting channel name and description from the request body
    const { channelName, channelDescription } = req.body;
    console.log(req.body)

    // Extracting authenticated user details added by authentication middleware
    const { id, email } = req.user;

    // Validate that channel name is provided
    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // Check if a channel with the same name already exists in the database
    const existingChannel = await channelModel.findOne({ channelName });

    // If a channel already exists, return a conflict response
    if (existingChannel) {
      return res.status(409).json({ message: "Channel already exists" });
    }

    // If a file is uploaded (using multer), set the channel profile image path
    // If no file is uploaded, keep the profile image as null
    const channelprofile = req.file
      ? `/uploads/channelprofile/${req.file.filename}`
      : null;

    // Create a new channel document in the database
    const newChannel = await channelModel.create({
      channelName,          // Channel name
      channelDescription,   // Channel description
      channelprofile,       // Channel profile image URL
      userid: id,           // Creator user ID
      useremail: email      // Creator user email
    });

    // Send success response along with the created channel data
    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel
    });

  } catch (err) {
    // Handle any server or database errors
    res.status(500).json({ error: err.message });
  }
}
