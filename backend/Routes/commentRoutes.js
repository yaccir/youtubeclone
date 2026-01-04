import { getcomments, setcomments } from "../Controller/comment.controller.js";

export function commentroutes(app)
{

    app.get("/comments/:id",getcomments)
     app.post("/comments",setcomments)

}