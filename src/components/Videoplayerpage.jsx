import React, { useEffect, useState } from 'react';
import "/src/css/videoplayerpage.css";
import Miniasidevideolist from './Miniasidevideolist';
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Videocards from './Videocards';

const Videoplayerpage = () => {
  const [watch, setWatch] = useState({ comments: [] });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8085/videolist/${id}`)
      .then((res) => {
        setWatch(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  // format views
  const formatViews = (num) => {
    if (!num) return "0 views";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  // format time as x days ago
  const formatTime = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  return (
    <div className='main-video-container'>
      <div className='videocontainer2'>

        {/* VIDEO PLAYER */}
        <video
          className='videoplayer'
          src={`http://localhost:8085${watch.videoUrl}`}
          controls
        />

        {/* TITLE */}
        <h1>{watch.title}</h1>

        {/* CHANNEL INFO */}
        <div className='videosubscribecont'>
          <img
            className='usersubscribeicon'
            src={
              watch.channelProfile
                ? `http://localhost:8085${watch.channelProfile}`
                : "https://www.gstatic.com/youtube/img/creator/default_channel.png"
            }
            alt={watch.channelName}
          />
          <div>
            <h2>{watch.channelName}</h2>
            <p>subscribers</p>
          </div>
          <button className='subscribebtn'>Subscribe</button>
        </div>

        {/* LIKES / DISLIKES / SHARE */}
        <div className='thumbsupcontainer'>
          <button className='likecalculations'>
            <img className='like' src="/src/images/asideimages/thumbsup.png" alt="" />
            <p>{watch.likes}</p>
          </button>
          <button className='unlikebtnn'>
            <img className='unlikecalculations' src="/src/images/asideimages/thumbsupun.png" alt="" />
            <p>{watch.dislikes}</p>
          </button>
          <button className='sharebtn'>
            <img className='shareimg' src="/src/images/asideimages/share.png" alt="" />
            <p>Share</p>
          </button>
        </div>

        {/* VIEWS / DATE */}
        <div className='viewsvideo'>
          <p>{formatViews(watch.views)}</p>
          <p>{formatTime(watch.updatedAt)}</p>
        </div>

        {/* DESCRIPTION */}
        <p className='ddesc'>{watch.description}</p>

        {/* COMMENTS */}
        <div className='comntsdiv'>
          <p className='totalcmnts'>{watch.comments?.length} Comments</p>
          {/* <Comments  /> */}
        </div>
      </div>

      {/* MINI SIDE VIDEO LIST */}
      <div className='videocontainer3'>
        <Videocards />
      </div>
    </div>
  );
};

export default Videoplayerpage;
