import express from "express";
import jwt from "jsonwebtoken";
import youtubeModel from "../Models/Youtube.Model.js";
import channelModel from "../Models/Channel.model.js";

const router = express.Router();

//   AUTH MIDDLEWARE

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secretkey11", (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}

/*  GET CHANNEL DETAILS
 */
router.get("/channelviewpage/:id", verifyToken, async (req, res) => {
  try {
    const channel = await channelModel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    res.json({ success: true, channel });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/*   GET CHANNEL VIDEOS
 */
router.get("/channel/:channelId/videos", async (req, res) => {
  try {
    const videos = await youtubeModel
      .find({ channelId: req.params.channelId })
      .sort({ createdAt: -1 });

    res.json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE VIDEO
router.delete("/videos/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id)
    const video = await youtubeModel.findById(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });

    // Fetch channel to check owner
    const channel = await channelModel.findById(video.channelId);
    if (!channel) return res.status(404).json({ success: false, message: "Channel not found" });



    // Delete video
    await youtubeModel.deleteOne({ _id: video._id });
    return res.json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    console.error("DELETE VIDEO ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



export default router;
