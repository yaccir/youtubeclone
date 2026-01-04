import userModel from "../Models/User.Model.js";
import youtubeModel from "../Models/Youtube.Model.js";
import jwt from "jsonwebtoken"

export async function  getcomments(req,res)
{
    const id=req.params.id;
    try{

        console.log("comment",id)
        const foundvideo=await youtubeModel.findById(id)
        if(!foundvideo)
            res.status(404).json({message:"video not found"});
        else
        {
            res.status(200).json(foundvideo)
        }

    }
    catch(err)
    {
        return res.status(500).json(err)
    }

}


export async function setcomments(req, res) {
  try {
   console.log("i am here")
    const { id, postcomment, token } = req.body;

    if (!id || !postcomment || !token) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, "secretkey11");
    console.log(token);
    console.log(decoded)
    // Fetch user
    const commenter = await userModel.findOne({ email: decoded.email });
    if (!commenter) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(commenter)

    // Create comment object (NO separate comment model needed)
    const newComment = {
      commentText: postcomment,
      commenterName: commenter.fullname,
      commenterProfile: commenter.profilepic,
      commenterEmail: commenter.email
    };

    // Push comment into video
    const video = await youtubeModel.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({
      message: "Comment added successfully",
      comments: video.comments
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
