import youtubeModel from "../Models/Youtube.Model.js";

export async function unlikeVideo(req, res) {
    const { likeid } = req.params; // ID of the video to unlike

  try {
        // Find the video by ID
        const video = await youtubeModel.findById(likeid);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Increment the likes
        video.dislikes = (video.dislikes || 0) + 1;

        // Save the updated document
        await video.save();

        // Respond with updated likes count
        res.status(200).json({ likes: video.dislikes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
