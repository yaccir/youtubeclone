import React from 'react';
import "/src/css/videocard.css";
import { useNavigate } from 'react-router-dom';

const Videocard = ({ title, thumbNail, channelName, views, time, channelProfile, id }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/watch/${id}`);
  }

  // Format views like "12K views"
  const formatViews = (num) => {
    if (!num) return "0 views";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  // Format time as "x days ago"
  const formatTime = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  return (
    <div className='parentvideocard' onClick={handleClick}>
      {/* Video Thumbnail */}
      <div className='imagethumbcont'>
        <img className='thumbnailvideo' src={`http://localhost:8085${thumbNail}`} alt={title} />
      </div>

      {/* Video Details */}
      <div className='detailsconttaboutvideo'>
        <div>
          {/* Channel Profile */}
          <img
            className='channeliconuser'
            src={`http://localhost:8085${channelProfile}` || "https://www.gstatic.com/youtube/img/creator/default_channel.png"}
            alt={channelName}
          />
        </div>
        <div className='details2'>
          <h2 className='title2'>{title}</h2>
          <h3 className='uploadername'>{channelName}</h3>
          <div className='viewscont'>
            <p>{formatViews(views)}</p>
            <p>{formatTime(time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videocard;
