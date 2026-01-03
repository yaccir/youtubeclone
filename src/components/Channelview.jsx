import React, { useEffect, useState } from "react";
import "/src/css/channelview.css";
import { useParams } from "react-router-dom";

const Channelview = () => {
  const { id } = useParams();                 // channel id from URL
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(channel)



  function handleuploadvideo()
  {
    navigate("/uploadvideo")
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8085/channelviewpage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setChannel(data.channel);           // ONE channel object
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Channel fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading channel...</h3>;
  }

  if (!channel) {
    return <h3 style={{ textAlign: "center" }}>Channel not found</h3>;
  }

  return (
    <div className="channel-view">
      {/* Banner */}
      <div className="channel-banner"></div>

      {/* Header */}
      <div className="channel-header">
<img
  src={
    channel.channelprofile
      ? `http://localhost:8085${channel.channelprofile}`
      : "https://www.gstatic.com/youtube/img/creator/default_channel.png"
  }
  alt="channel"
  className="channel-avatar"
/>



        <div className="channel-info">
          <h2>{channel.channelName}</h2>

          <p className="channel-meta">
            @{channel.channelName.toLowerCase().replace(/\s/g, "")} •{" "}
            {channel.subscribers || 0} subscribers •{" "}
            {channel.videosCount || 0} videos
          </p>

          <p className="channel-desc">
            {channel.channelDescription}
          </p>
        </div>

        <button  onClick={handleuploadvideo} className="subscribe-btn">Upload Video</button>
      </div>

      {/* Tabs */}
      <div className="channel-tabs">
        <span className="active">Home</span>
        <span>Videos</span>
        <span>Playlists</span>
        <span>About</span>
      </div>

      {/* Videos (placeholder for now) */}
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

export default Channelview;
