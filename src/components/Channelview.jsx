import React, { useEffect, useState } from "react";
import "/src/css/channelview.css";
import { useNavigate, useParams } from "react-router-dom";

const Channelview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* Decode userId from token (basic) */
  let loggedInUserId = null;
  if (token) {
    try {
      loggedInUserId = JSON.parse(atob(token.split(".")[1])).id;
    } catch {}
  }

  /* Upload video */
  function handleUploadVideo() {
    navigate(`/uploadvideo/${channel._id}`);
  }

  /* Delete video */
  async function handleDeleteVideo(videoId) {
    if (!window.confirm("Delete this video?")) return;

    try {
      await fetch(`http://localhost:8085/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVideos(prev => prev.filter(v => v._id !== videoId));
    } catch (err) {
      console.error(err);
    }
  }

  /* Fetch channel + videos */
  useEffect(() => {
    async function fetchData() {
      try {
        const channelRes = await fetch(
          `http://localhost:8085/channelviewpage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const channelData = await channelRes.json();
        if (channelData.success) {
          setChannel(channelData.channel);

          const videosRes = await fetch(
            `http://localhost:8085/channel/${id}/videos`
          );
          const videosData = await videosRes.json();

          if (videosData.success) {
            setVideos(videosData.videos);
          }
        }
      } catch (err) {
        console.error("Channel fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  /* Loading */
  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading channel...</h3>;
  }

  /* Not found */
  if (!channel) {
    return <h3 style={{ textAlign: "center" }}>Channel not found</h3>;
  }

  const isOwner = channel.userId === loggedInUserId;

  return (
    <div className="channel-view">
      <div className="channel-banner"></div>

      <div className="channel-header">
        <img
          className="channel-avatar"
          src={
            channel.channelprofile
              ? `http://localhost:8085${channel.channelprofile}`
              : "https://www.gstatic.com/youtube/img/creator/default_channel.png"
          }
          alt="channel"
        />

        <div className="channel-info">
          <h2>{channel.channelName}</h2>

          <p className="channel-meta">
            @{channel.channelName.toLowerCase().replace(/\s/g, "")} •{" "}
            {channel.subscribers || 0} subscribers •{" "}
            {videos.length} videos
          </p>

          <p className="channel-desc">{channel.channelDescription}</p>
        </div>

        {isOwner && (
          <button
            className="subscribe-btn"
            onClick={handleUploadVideo}
          >
            Upload Video
          </button>
        )}
      </div>

      <div className="channel-tabs">
        <span className="active">Home</span>
        <span>Videos</span>
        <span>Playlists</span>
        <span>About</span>
      </div>

      <div className="channel-videos">
        {videos.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No videos uploaded yet
          </p>
        )}

        {videos.map(video => (
          <div key={video._id} className="video-card">
            <img
              className="thumbnail"
              src={`http://localhost:8085${video.thumbnailUrl}`}
              alt=""
            />

            <h4>{video.title}</h4>
            <p>{video.views} views</p>

            {isOwner && (
              <button
                className="delete-video-btn"
                onClick={() => handleDeleteVideo(video._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channelview;
