import {
  
  getcomments,
  updateComment,
  deleteComment,
  setcomments
} from "../Controller/comment.controller.js";

export function commentroutes(app) {
  app.post("/comments", setcomments);                     // CREATE
  app.get("/comments/:id", getcomments);               // READ
  app.put("/comments/:videoId/:commentId", updateComment);  // UPDATE
  app.delete("/comments/:videoId/:commentId", deleteComment); // DELETE
}
