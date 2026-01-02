import { login, registeruser } from "../Controller/user.controller.js";
import { addvideo, addvideotofolder, fetchvideolist, fetchvideolistbyId, } from "../Controller/youtube.controller.js";
import  upload  from "../Middlewares/upload.js";
import { verifytoken } from "../Middlewares/verifytoken.js";

export  function youtuberoutes(app){

app.get("/videolist",fetchvideolist)
app.get("/videolist/:id",fetchvideolistbyId);

app.post("/videolist2",addvideo)

app.post(  "/videolist",verifytoken,upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  addvideotofolder
);


app.post(
  "/register",
  upload.single("profilepic"),
  registeruser
);


app.post("/login",login);
}

