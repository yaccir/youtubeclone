import React, { useEffect, useState } from 'react'
import "/src/css/Videocards.css"
import Videocard from './Videocard'
import axios from 'axios'

const Videocards = () => {

  const [videoData,setVideoData]=useState([])

useEffect(()=>{

axios.get("http://localhost:8085/videolist").then((res)=>{

      console.log(res.data)

});

},[videoData])

  return (
    <div className='parentgrid'>
        <Videocard/>
        <Videocard/>
        <Videocard/>
          <Videocard/>
        <Videocard/>
        <Videocard/>
    </div>
  )
}

export default Videocards