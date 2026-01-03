
import channelModel from "../Models/Channel.model.js";
import youtubeModel from "../Models/Youtube.Model.js";

// Fetch all videos
export async function fetchvideolist(req, res) {
  try {
    // Fetch all videos, newest first
    const videolist = await youtubeModel.find({}).sort({ createdAt: -1 });

    // Return empty array if no videos
    return res.status(200).json({
      success: true,
      videos: videolist
    });
  } catch (err) {
    console.error("Error fetching videos:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
}

// Add a video (metadata only)
export async function addvideo(req, res) {
  try {
    const addedvideo = await youtubeModel.create(req.body);
    if (addedvideo) {
      return res.status(201).json(addedvideo);
    }
    return res.status(400).json({ message: "Video not added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// Fetch video by ID
export async function fetchvideolistbyId(req, res) {
  const { id } = req.params;
  try {
    const videolist = await youtubeModel.findById(id);
    if (!videolist) {
      return res.status(404).json({ message: "No Video found" });
    }
    return res.status(200).json(videolist);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


export const addvideotofolder = async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const videoFile = req.files.video[0];
    const thumbFile = req.files.thumbnail?.[0];

    /* 🔍 Find user's channel */
    const channel = await channelModel.findOne({ userId: req.user._id });

    if (!channel) {
      return res.status(400).json({
        message: "Please create a channel before uploading videos"
      });
    }

    /* 🎥 Create video */
    const video = new youtubeModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,

      videoUrl: `/uploads/videos/${videoFile.filename}`,
      thumbnailUrl: thumbFile
        ? `/uploads/thumbnails/${thumbFile.filename}`
        : null,

      /*  Channel snapshot */
      channelName: channel.channelName,
      channelProfile: channel.channelprofile, // exact field from channel model
      channelId: channel._id,

      /* 👤 Owner */
      userId: req.user._id
    });

    await video.save();

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


