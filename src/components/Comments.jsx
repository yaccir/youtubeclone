
import "/src/css/comments.css"
import axios from "axios";
import React, { useEffect, useState } from "react";

const Comments = ({ videoid }) => {
  const [commentdata, setCommentdata] = useState([]);
  const [inputcomment, setInputcomment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (videoid) fetchcomments();
  }, [videoid]);

  async function fetchcomments() {
    try {
      const res = await axios.get(
        `http://localhost:8085/comments/${videoid}`
      );
      if (res.status === 200) setCommentdata(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  }

  async function sendcomment() {
    if (!inputcomment.trim()) return;

    try {
      const res = await axios.post("http://localhost:8085/comments", {
        id: videoid,
        postcomment: inputcomment,
        token: localStorage.getItem("token")
      });

      if (res.status === 200) {
        setCommentdata(res.data.comments);
        setInputcomment("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteComment(commentId) {
    try {
      const res = await axios.delete(
        `http://localhost:8085/comments/${videoid}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.status === 200) setCommentdata(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateComment(commentId) {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:8085/comments/${videoid}/${commentId}`,
        { commentText: editText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.status === 200) {
        setCommentdata(res.data.comments);
        setEditingId(null);
        setEditText("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="comments-container">
      <p className="comments-count">{commentdata.length} comments</p>

      <div className="comment-input-wrapper">
        <input
          className="comment-input"
          type="text"
          placeholder="Add a comment"
          value={inputcomment}
          onChange={(e) => setInputcomment(e.target.value)}
        />
        <button className="comment-btn" onClick={sendcomment}>
          Comment
        </button>
      </div>

      <div className="comments-list">
        {commentdata.map((comment) => (
          <div className="comment-card" key={comment._id}>
            <img
              className="comment-avatar"
              src={comment.commenterProfile}
              alt=""
            />

            <div className="comment-body">
              <p className="comment-name">{comment.commenterName}</p>

              {editingId === comment._id ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <div className="comment-actions">
                    <button
                      className="save-btn"
                      onClick={() => updateComment(comment._id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="comment-text">{comment.commentText}</p>

                  <div className="comment-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditText(comment.commentText);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
