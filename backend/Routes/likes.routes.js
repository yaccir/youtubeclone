import { likeVideo } from "../Controller/likes.controller.js";
import { unlikeVideo } from "../Controller/unlikes.controller.js";

export function likeroutes(app) {
    // Routes for liking/unliking a video
    app.put("/likevideo/:likeid", likeVideo);
    app.put("/unlikevideo/:likeid", unlikeVideo);
}
