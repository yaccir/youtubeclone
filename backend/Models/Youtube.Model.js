// Importing mongoose to define schema and create model
import mongoose from "mongoose";

// Importing the comment schema to embed comments in videos
import commentSchema from "./Comments.schema.js";

// Defining the schema for the YouTube videos collection
const youtubeSchema = new mongoose.Schema(
  {
    // Title of the video (required)
    title: {
      type: String,
      required: true
    },

    // Description or details about the video
    description: {
      type: String
    },

    // Category of the video (e.g., Education, Music)
    category: {
      type: String
    },

    // URL or path to the video file (required)
    videoUrl: {
      type: String,
      required: true
    },

    // URL or path to the video thumbnail image
    thumbnailUrl: {
      type: String
    },

    /* Channel snapshot data at the time of upload */
    channelName: {
      type: String
    },

    channelProfile: {
      type: String // Example: /uploads/channelprofile/profile.jpg
    },

    // Reference to the channel that owns the video
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels"
    },

    /* Video owner */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },

    // Number of views the video has received
    views: {
      type: Number,
      default: 0
    },

    // Number of likes on the video
    likes: {
      type: Number,
      default: 0
    },

    // Number of dislikes on the video
    dislikes: {
      type: Number,
      default: 0
    },

    // Embedded array of comments on the video
    comments: {
      type: [commentSchema],
      default: []
    }
  },

  // Automatically adds createdAt and updatedAt timestamps
  { timestamps: true }
);

// Creating the Video model using the schema
const youtubeModel = mongoose.model("videos", youtubeSchema);

// Exporting the Video model for use in other parts of the application
export default youtubeModel;
