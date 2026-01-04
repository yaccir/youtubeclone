import { getcomments } from "../Controller/comment.controller.js";

export function commentroutes(app)
{

    app.get("/comments",getcomments)

}