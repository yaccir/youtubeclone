import React from "react";
import "/src/css/channelview.css";

const Channelview = () => {
  return (
    <div className="channel-view">
      {/* Banner */}
      <div className="channel-banner"></div>

      {/* Header */}
      <div className="channel-header">
        <img
          src="https://www.gstatic.com/youtube/img/creator/default_channel.png"
          alt="channel"
          className="channel-avatar"
        />

        <div className="channel-info">
          <h2>Yasir Tech</h2>
          <p className="channel-meta">
            @yasirtech • 12.4K subscribers • 120 videos
          </p>
          <p className="channel-desc">
            Programming tutorials, React, JavaScript and backend development.
          </p>
        </div>

        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Tabs */}
      <div className="channel-tabs">
        <span className="active">Home</span>
        <span>Videos</span>
        <span>Playlists</span>
        <span>About</span>
      </div>

      {/* Videos */}
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
