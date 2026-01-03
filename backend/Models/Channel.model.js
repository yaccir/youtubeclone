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
    },
    useremail:{
      type:String
    },
    userid:{
       type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

const channelModel = mongoose.model("channels", channelSchema);
export default channelModel;
