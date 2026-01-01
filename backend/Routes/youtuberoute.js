import { addvideo, addvideotofolder, fetchvideolist, fetchvideolistbyId } from "../Controller/youtube.controller.js";
import  upload  from "../Middlewares/upload.js";

export  function youtuberoutes(app){

app.get("/videolist",fetchvideolist)
app.post("/videolist2",addvideo)
app.get("/videolist/:id",fetchvideolistbyId);
app.post(
  "/videolist",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  addvideotofolder
);


}