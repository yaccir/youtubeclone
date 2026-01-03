import React, { useEffect } from 'react';
import "/src/css/Videocards.css";
import Videocard from './Videocard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchvid } from '../utils/youtubedataslice';

const Videocards = ({category}) => {
  const dispatch = useDispatch();

  // items will store the array of videos
  const videos = useSelector(store => store.youtube.items || []);
  console.log(videos)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
           console.log(category+"jhjhjhv")
        if(category!==undefined){
          console.log(category+"jhjhjhv")
          
           const res = await axios.get(`http://localhost:8085/videolist/${category}`);
           console.log(res.data)
             dispatch(fetchvid(res.data.videos || []));
          }
        }
         catch (error) {
        console.error("Video fetch failed:", error);
      }
    };

    fetchVideos();
  }, [dispatch,category]);

  return (
    <div className='parentgrid'>
      {videos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No videos available</p>
      ) : (
        videos.map(video => (
          <Videocard
            key={video._id}
            id={video._id}
            channelName={video.channelName || "Unknown Channel"}
            channelProfile={video.channelProfile} // optional
            thumbNail={video.thumbnailUrl || "https://www.gstatic.com/youtube/img/creator/default_channel.png"}
            title={video.title}
            views={video.views || 0}
            time={video.updatedAt}
          />
        ))
      )}
    </div>
  );
};

export default Videocards;
