// Importing React and hooks
import React, { useEffect, useState } from "react";

// Importing CSS specific to the channel view page
import "/src/css/channelview.css";

// Importing router hooks for navigation and reading URL params
import { useNavigate, useParams } from "react-router-dom";

// Component to display a single channel's page
const Channelview = () => {
  const navigate = useNavigate();           // Hook to programmatically navigate
  const { id } = useParams();               // Extract channel ID from URL
  const [channel, setChannel] = useState(null); // State to store fetched channel data
  const [loading, setLoading] = useState(true); // State to track loading status
console.log(channel)
  console.log(channel); // Debug: log channel object

  // Handler for "Upload Video" button click
  function handleuploadvideo() {
    const {_id}=channel
    navigate(`/uploadvideo/${_id}`);
  }

  // Fetch channel data from backend on component mount or when ID changes
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get JWT token from localStorage

    fetch(`http://localhost:8085/channelviewpage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setChannel(data.channel); // Set channel state with fetched data
        }
        setLoading(false);          // Stop loading after fetch completes
      })
      .catch(err => {
        console.error("Channel fetch error:", err);
        setLoading(false);          // Stop loading if fetch fails
      });
  }, [id]);

  // Show loading state
  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading channel...</h3>;
  }

  // Show error if channel not found
  if (!channel) {
    return <h3 style={{ textAlign: "center" }}>Channel not found</h3>;
  }

  return (
    <div className="channel-view">
      {/* Banner placeholder */}
      <div className="channel-banner"></div>

      {/* Channel header with avatar, info, and upload button */}
      <div className="channel-header">
        <img
          src={
            channel.channelprofile
              ? `http://localhost:8085${channel.channelprofile}` // Show uploaded channel profile
              : "https://www.gstatic.com/youtube/img/creator/default_channel.png" // Fallback image
          }
          alt="channel"
          className="channel-avatar"
        />

        <div className="channel-info">
          {/* Channel name */}
          <h2>{channel.channelName}</h2>

          {/* Channel meta info: handle, subscribers, video count */}
          <p className="channel-meta">
            @{channel.channelName.toLowerCase().replace(/\s/g, "")} •{" "}
            {channel.subscribers || 0} subscribers •{" "}
            {channel.videosCount || 0} videos
          </p>

          {/* Channel description */}
          <p className="channel-desc">
            {channel.channelDescription}
          </p>
        </div>

        {/* Button to navigate to video upload page */}
        <button onClick={handleuploadvideo} className="subscribe-btn">Upload Video</button>
      </div>

      {/* Channel tabs: Home, Videos, Playlists, About */}
      <div className="channel-tabs">
        <span className="active">Home</span>
        <span>Videos</span>
        <span>Playlists</span>
        <span>About</span>
      </div>

      {/* Videos section (currently placeholder) */}
      <div className="channel-videos">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="video-card">
            <div className="thumbnail"></div>
            <h4>Video title goes here</h4>
            <p>12K views • 2 days ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporting the Channelview component
export default Channelview;
