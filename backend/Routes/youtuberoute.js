import { addvideo, fetchvideolist, fetchvideolistbyId } from "../Controller/youtube.controller.js";

export async function youtuberoutes(app){

app.get("/videolist",fetchvideolist)
app.post("/videolist",addvideo)
app.get("/videolist/:id",fetchvideolistbyId);

}