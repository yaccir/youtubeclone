import mongoose from "mongoose"

const youtubeSchema=mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    channelName: {
      type: String,
      required: true
    },

    views: {
      type: Number,
      default: 0
    },

    description: String,

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

)


const youtubeModel=mongoose.Model("videos",youtubeSchema);

export default youtubeModel;