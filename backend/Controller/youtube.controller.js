// Importing Channel model to access channel-related data
import channelModel from "../Models/Channel.model.js";

// Importing Youtube model to manage video-related operations
import youtubeModel from "../Models/Youtube.Model.js";

// Controller function to fetch videos based on category
export async function fetchvideolist(req, res) {
  try {
    // Extracting category from route parameters
    const { category } = req.params;

    // Logging category for debugging
    

    // If category is not "all", fetch videos for the specific category
    if (category != "all") {
    

      // Fetching videos matching the category, sorted by newest first
      const videolistbycat = await youtubeModel
        .find({ category: category })
        .sort({ createdAt: -1 });

      // Logging fetched videos for debugging
 

      // Sending response with category-based videos
      return res.status(200).json({
        success: true,
        videos: videolistbycat
      });
    }

    // If category is "all", fetch all videos
    else if (category == "all") {
      // Fetching all videos sorted by newest first
      const videolist = await youtubeModel
        .find({})
        .sort({ createdAt: -1 });

      // Logging fetched videos for debugging
     

      // Sending response with all videos
      return res.status(200).json({
        success: true,
        videos: videolist
      });
    }

  } catch (err) {
    // Logging error details for debugging
    console.error("Error fetching videos:", err);

    // Sending internal server error response
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
}

// Controller function to search videos by title or category
export async function searchVideos(req, res) {
  try {
    // Extracting search text from route parameters
    const { search } = req.params;

    // Validating search input
    if (!search || search.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search input is required"
      });
    }

    // Searching videos using case-insensitive regex on title and category
    const videos = await youtubeModel
      .find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      })
      .sort({ createdAt: -1 });

    // Sending search results
    return res.status(200).json({
      success: true,
      videos
    });

  } catch (error) {
    // Logging search-related errors
    console.error(error);

    // Sending server error response
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

// Controller function to add video metadata only
export async function addvideo(req, res) {
  try {
    // Creating a new video document using request body data
    const addedvideo = await youtubeModel.create(req.body);

    // If video is created successfully, return success response
    if (addedvideo) {
      return res.status(201).json(addedvideo);
    }

    // If video creation fails, return bad request response
    return res.status(400).json({ message: "Video not added" });

  } catch (err) {
    // Logging error details
    console.error(err);

    // Sending internal server error response
    return res.status(500).json({ error: err.message });
  }
}

// Controller function to fetch a single video by its ID
export async function fetchvideolistbyId(req, res) {
  // Extracting video ID from route parameters
  const { id } = req.params;

  try {
    // Fetching video document by ID
    const videolist = await youtubeModel.findById(id);

    // If video does not exist, return not found response
    if (!videolist) {
      return res.status(404).json({ message: "No Video found" });
    }

    // Sending fetched video as response
    return res.status(200).json(videolist);

  } catch (err) {
    // Logging error details
    console.error(err);

    // Sending internal server error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to upload video and thumbnail files and save video data
export const addvideotofolder = async (req, res) => {
  try {
    // Validating that video file is provided
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "Video file is required" });
    }

   
    const channelid=req.params.id

    // Extracting uploaded video file
    const videoFile = req.files.video[0];

    // Extracting uploaded thumbnail file if provided
    const thumbFile = req.files.thumbnail?.[0];

    // Finding the channel associated with the logged-in user
    const channel = await channelModel.findById( channelid );
   
    // Logging execution flow for debugging
 
    // If user does not have a channel, prevent video upload
    if (!channel) {
      return res.status(400).json({
        message: "Please create a channel before uploading videos"
      });
    }

    // Creating a new video document with file paths and metadata
    const video = new youtubeModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,

      // Storing video file path
      videoUrl: `/uploads/videos/${videoFile.filename}`,

      // Storing thumbnail file path if available
      thumbnailUrl: thumbFile
        ? `/uploads/thumbnails/${thumbFile.filename}`
        : null,

      // Saving snapshot of channel details
      channelName: channel.channelName,
      channelProfile: channel.channelprofile,
      channelId: channel._id,

      // Storing owner user ID
      userId: req.user._id
    });

    // Saving video document to the database
    await video.save();

    // Sending success response after upload
    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video
    });

  } catch (err) {
    // Logging upload-related errors
    console.error("UPLOAD ERROR:", err);

    // Sending server error response
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
