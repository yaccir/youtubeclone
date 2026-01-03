import mongoose from "mongoose";
import commentSchema from "./Comments.schema.js";

const youtubeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    category: {
      type: String
    },

    videoUrl: {
      type: String,
      required: true
    },

    thumbnailUrl: {
      type: String
    },

    /*  Channel snapshot data */
    channelName: {
      type: String
    },

    channelProfile: {
      type: String // e.g. /uploads/channelprofile/profile.jpg
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels"
    },

    /* Video owner */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },

    views: {
      type: Number,
      default: 0
    },

    likes: {
      type: Number,
      default: 0
    },

    dislikes: {
      type: Number,
      default: 0
    },

    comments: {
      type: [commentSchema],
      default: []
    }
  },
  { timestamps: true }
);

const youtubeModel = mongoose.model("videos", youtubeSchema);
export default youtubeModel;
