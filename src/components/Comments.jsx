import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/css/comments.css";

const Comments = ({ videoId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8085/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post("http://localhost:8085/comments", {
        videoId,
        commenterId: currentUser.id,
        commenterName: currentUser.name,
        commenterProfile: currentUser.profile || "/default-profile.png",
        commentText: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8085/comments/${videoId}/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (commentId, text) => {
    const updatedText = prompt("Edit your comment:", text);
    if (!updatedText) return;
    try {
      const res = await axios.put(`http://localhost:8085/comments/${videoId}/${commentId}`, {
        commentText: updatedText,
      });
      setComments(comments.map((c) => (c._id === commentId ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comments-section">
      <form className="comment-box" onSubmit={handleAddComment}>
        <img className="commentsimage2" src={currentUser.profile || "/default-profile.png"} alt="profile" />
        <input
          type="text"
          placeholder="Add a public comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>

      {comments.map((item) => (
        <div className="maincontainercomments" key={item._id}>
          <img className="commentsimage2" src={item.commenterProfile} alt="" />
          <div>
            <div className="commentcontainer">
              <div className="commentusername">
                <p>{item.commenterName}</p>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              {item.commenterId === currentUser.id && (
                <div className="commenteditdel">
                  <button onClick={() => handleEdit(item._id, item.commentText)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              )}
            </div>
            <div>
              <p>{item.commentText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
