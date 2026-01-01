// commentSchema.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commenterName: {
      type: String,
      required: true
    },
    commenterProfile: {
      type: String,
      required: true
    },
    commentText: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default commentSchema;
