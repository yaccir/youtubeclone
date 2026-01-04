import youtubeModel from "../Models/Youtube.Model.js";
import userModel from "../Models/User.Model.js";
import jwt from "jsonwebtoken";

/* GET COMMENTS */
export async function getcomments(req, res) {
  try {
    console.log(req.params.id)
    const video = await youtubeModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      comments: video.comments
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

/* ADD COMMENT */
export async function setcomments(req, res) {
  try {
    const { id, postcomment, token } = req.body;
    const decoded = jwt.verify(token, "secretkey11");

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const video = await youtubeModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.comments.push({
      commentText: postcomment,
      commenterName: user.fullname,
      commenterEmail: user.email,
      commenterProfile: user.profilepic
    });

    await video.save();
    res.status(200).json({ comments: video.comments });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

/* UPDATE COMMENT */
export async function updateComment(req, res) {
  try {
    const { videoId, commentId } = req.params;
    const { commentText } = req.body;

    const video = await youtubeModel.findById(videoId);
    const comment = video.comments.id(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.commentText = commentText;
    await video.save();

    res.status(200).json({ comments: video.comments });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

/* DELETE COMMENT */
export async function deleteComment(req, res) {
  try {
    const { videoId, commentId } = req.params;

    const video = await youtubeModel.findById(videoId);
    video.comments = video.comments.filter(
      c => c._id.toString() !== commentId
    );

    await video.save();
    res.status(200).json({ comments: video.comments });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
