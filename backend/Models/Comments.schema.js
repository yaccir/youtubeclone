// Importing mongoose to define schema structure
import mongoose from "mongoose";

// Defining schema for storing individual comments
const commentSchema = new mongoose.Schema(
  {
    // Name of the user who posted the comment
    commenterName: {
      type: String,
      required: true
    },

    // Profile image URL of the commenter
    commenterProfile: {
      type: String,
      required: true
    },

    // Text content of the comment
    commentText: {
      type: String,
      required: true
    },

    // Number of likes on the comment
    likes: {
      type: Number,
      default: 0
    },

    // Number of dislikes on the comment
    dislikes: {
      type: Number,
      default: 0
    }
  },

  // Automatically manages createdAt and updatedAt timestamps
  { timestamps: true }
);

// Exporting the comment schema to be reused in other models
export default commentSchema;
