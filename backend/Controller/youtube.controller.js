
import youtubeModel from "../Models/Youtube.Model.js";

// Fetch all videos
export async function fetchvideolist(req, res) {
  try {
    const videolist = await youtubeModel.find({});
    if (videolist.length === 0) {
      return res.status(404).json({ message: "No Videos found" });
    }
    return res.status(200).json(videolist);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
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
    const videoFile = req.files.video?.[0];
    const thumbFile = req.files.thumbnail?.[0];

    if (!videoFile) return res.status(400).json({ message: "Video required" });

    const video = new youtubeModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      videoUrl: `/uploads/videos/${videoFile.filename}`,
      thumbnailUrl: thumbFile ? `/uploads/thumbnails/${thumbFile.filename}` : null,
      userId: req.user._id,
      createdAt: new Date()
    });

    await video.save();

    res.status(201).json({ success: true, message: "Video uploaded successfully", video });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


