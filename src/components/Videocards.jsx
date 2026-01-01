import React, { useEffect, useState } from 'react'
import "/src/css/Videocards.css"
import Videocard from './Videocard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchvid } from '../utils/youtubedataslice'

const Videocards = () => {

  const [videoData,setVideoData]=useState([])
  const dispatch=useDispatch();

  const data=useSelector((store)=>store.youtube.items)

console.log(data)
useEffect(()=>{

axios.get("http://localhost:8085/videolist").then((res)=>{

  dispatch(fetchvid(res.data))


});

},[])

  return (
    <div className='parentgrid'>
      {

        data.map((videoitem)=>{
          return <Videocard
          key={videoitem._id}  
          channelName={videoitem.channelName} 
          description={videoitem.description} 
          dislikes={videoitem.dislikes} 
          likes={videoitem.likes} 
          thumbNail={videoitem.thumbNail}
          title={videoitem.title}
          videoUrl={videoitem.videoUrl} 
          views={videoitem.views}
          id={videoitem._id}
            />
        })

      }
        
    
    </div>
  )
}

export default Videocards