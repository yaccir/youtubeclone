import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelprofile: {
      type: String,
      required: true
    },
    channelName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    channelDescription: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const channelModel = mongoose.model("channels", channelSchema);
export default channelModel;
