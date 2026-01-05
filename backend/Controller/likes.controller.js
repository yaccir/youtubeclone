import youtubeModel from "../Models/Youtube.Model.js"; // Make sure the file extension is correct

export async function likeVideo(req, res) {
    const { likeid } = req.params; // ID of the video to like

    try {
        // Find the video by ID
        const video = await youtubeModel.findById(likeid);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Increment the likes
        video.likes = (video.likes || 0) + 1;

        // Save the updated document
        await video.save();

        // Respond with updated likes count
        res.status(200).json({ likes: video.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
