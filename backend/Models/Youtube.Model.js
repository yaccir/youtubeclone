import mongoose from "mongoose"
import commentSchema from "./Comments.schema.js";

const youtubeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  channelName: { type: String },
  videoUrl: { type: String, required: true }, // <-- this stores the path or URL
   thumbNail:{type:String},
   views: { type: Number, default: 0 },
    description: String,
 
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
 comments: { type: [commentSchema], default: [] }
}, { timestamps: true });


const youtubeModel=mongoose.model("videos",youtubeSchema);

export default youtubeModel;