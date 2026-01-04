// Importing mongoose to define schema and interact with MongoDB
import mongoose from "mongoose";

// Defining the schema for the channel collection
const channelSchema = new mongoose.Schema(
  {
    // URL or path of the channel profile image
    channelprofile: {
      type: String,
      required: true
    },

    // Unique name of the channel
    channelName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Description or bio of the channel
    channelDescription: {
      type: String,
      required: true
    },

    // Email of the user who owns the channel
    useremail: {
      type: String
    },

    // MongoDB ObjectId of the user who created the channel
    userid: {
      type: mongoose.Schema.Types.ObjectId
    }
  },

  // Automatically adds createdAt and updatedAt timestamps
  { timestamps: true }
);

// Creating the Channel model using the schema
const channelModel = mongoose.model("channels", channelSchema);

// Exporting the Channel model
export default channelModel;
