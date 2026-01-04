// Importing controller functions for channels, videos, and users
import { createChannel } from "../Controller/channel.controller.js";
import { channelviewpage } from "../Controller/channelDetails.js";
import { getchannel } from "../Controller/getChannel.controller.js";
import { login, registeruser } from "../Controller/user.controller.js";
import {
  addvideo,
  addvideotofolder,
  fetchvideolist,
  fetchvideolistbyId,
  searchVideos,
} from "../Controller/youtube.controller.js";

// Importing middleware for file uploads and token verification
import upload from "../Middlewares/upload.js";
import uploadChannel from "../Middlewares/uploadchannel.js";
import uploadprofile from "../Middlewares/uploadprofile.js";
import { verifychanneltoken } from "../Middlewares/verifychanneltoken.js";
import { verifytoken } from "../Middlewares/verifytoken.js";

// Route function to define all application routes
export  function youtuberoutes(app){

// app.get("/videolist",fetchvideolist)
app.get("/videolist/:category",fetchvideolist)
app.get("/videolistt/:id",fetchvideolistbyId);
app.post(  "/videolist",verifytoken,upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),  addvideotofolder
);
app.get("/videolist/search/:search", searchVideos);


//login routes
app.post(
  "/register",
  uploadprofile.single("profilepic"),
  registeruser
);
app.post("/login",login);


//channelroutes
app.post("/createchannel",verifychanneltoken,uploadChannel.single("channelprofile"),createChannel)
app.get("/viewchannels",getchannel);
app.get("/channelviewpage/:id",channelviewpage);

//commentroutes
// app.get("/comments",getcomments)
// app.post("/comments",addcomment)
// app.delete("/comments",deletecomments)
// app.put("/comments",editcomment)

}

