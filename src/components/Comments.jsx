// Importing React, hooks, and Axios for API calls
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import CSS for styling comments section
import "/src/css/comments.css";

// Comments component: displays and manages comments for a video
const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);   // State to store all comments
  const [newComment, setNewComment] = useState(""); // State for the input field

  // Fetch comments from backend for a specific video
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8085/comments/${videoId}`);
      setComments(res.data); // Set comments state with fetched data
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Fetch comments whenever the videoId changes
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // Handler to add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!newComment.trim()) return; // Ignore empty comments

    try {
      const res = await axios.post("http://localhost:8085/comments", {
        videoId,
        commenterId: currentUser.id,                       // Current logged-in user ID
        commenterName: currentUser.name,                   // User name
        commenterProfile: currentUser.profile || "/default-profile.png", // User profile pic
        commentText: newComment,                           // Comment text
      });
      setComments([res.data, ...comments]); // Add new comment at top
      setNewComment("");                     // Clear input field
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Handler to delete a comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8085/comments/${videoId}/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId)); // Remove deleted comment
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Handler to edit a comment
  const handleEdit = async (commentId, text) => {
    const updatedText = prompt("Edit your comment:", text); // Ask user for new text
    if (!updatedText) return;

    try {
      const res = await axios.put(`http://localhost:8085/comments/${videoId}/${commentId}`, {
        commentText: updatedText,
      });
      setComments(comments.map((c) => (c._id === commentId ? res.data : c))); // Update comment in state
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  return (
    <div className="comments-section">
      {/* Input box to add a new comment */}
      <form className="comment-box" onSubmit={handleAddComment}>
        <img
          className="commentsimage2"
          src={currentUser.profile || "/default-profile.png"}
          alt="profile"
        />
        <input
          type="text"
          placeholder="Add a public comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>

      {/* List all comments */}
      {comments.map((item) => (
        <div className="maincontainercomments" key={item._id}>
          {/* Commenter profile image */}
          <img className="commentsimage2" src={item.commenterProfile} alt="" />
          <div>
            {/* Comment header: name and timestamp */}
            <div className="commentcontainer">
              <div className="commentusername">
                <p>{item.commenterName}</p>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
              </div>

              {/* Show edit/delete buttons only if comment belongs to current user */}
              {item.commenterId === currentUser.id && (
                <div className="commenteditdel">
                  <button onClick={() => handleEdit(item._id, item.commentText)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              )}
            </div>

            {/* Comment text */}
            <div>
              <p>{item.commentText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Exporting Comments component
export default Comments;
