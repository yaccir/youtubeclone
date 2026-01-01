import React, { useEffect, useState } from 'react'
import "/src/css/Videocards.css"
import Videocard from './Videocard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchvid } from '../utils/youtubedataslice'

const Videocards = () => {

   const dispatch=useDispatch();

 const data = useSelector(
  store => store.youtube.items || []
);

console.log(data)

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8085/videolist");
      dispatch(fetchvid(res.data));
    } catch (error) {
      console.error("Video fetch failed:", error);
    }
  };

  fetchVideos();
}, [dispatch]);


  return (
    <div className='parentgrid'>
      {

        data.map((videoitem)=>{
          console.log(videoitem)
          return <Videocard
          key={videoitem._id}  
          channelName={videoitem.channelName} 
          thumbNail={videoitem.thumbNail}
          title={videoitem.title}
          views={videoitem.views}
          time={videoitem.updatedAt}
          id={videoitem._id}
            />
        })

      }
        
    
    </div>
  )
}

export default Videocards