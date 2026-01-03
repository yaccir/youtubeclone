import jwt from "jsonwebtoken";
import channelModel from "../Models/Channel.model.js";

export async function channelviewpage(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, "secretkey11");

    // Get channel ID from URL params
    const { id } = req.params;
    console.log(id)

    // Fetch channel by ID
    const channelpage = await channelModel.findById(id);

    if (!channelpage) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({
      success: true,
      channel: channelpage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load channel",
      error: error.message
    });
  }
}
