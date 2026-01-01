import React, { useEffect, useState } from 'react'
import "/src/css/videoplayerpage.css"
import Miniasidevideolist from './Miniasidevideolist'
import Comments from './Comments'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Videoplayerpage = () => {
 const [watch, setwatch] = useState({
  comments: []
});


  const {id}=useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8085/videolist/${id}`).then((res)=>{
        console.log(res.data)
        setwatch(res.data)
    })
  },[id])





  return (
    
      <div className='main-video-container'>

    <div className='videocontainer2'>
        <div>
        <video className='videoplayer' src="/src/css/qq.mp4"></video>
        <h1>{watch.title}</h1>
       <div className='sbbtn'>

         <div className='videosubscribecont'>
            <img className='usersubscribeicon' src="/src/images/icon.png" alt="" />
            <div>
                <h2>{watch.channelName}</h2>
                <p>subscribers</p>
            </div>
            <button className='subscribebtn'>Subscribe</button>

       </div>

            <div className='thumbsupcontainer'>

                <button className='likecalculations' ><img className='like' src="/src/images/asideimages/thumbsup.png" alt="" /><p>{watch.likes}</p></button>
                <button className='unlikebtnn'><img className='unlikecalculations' src="/src/images/asideimages/thumbsupun.png" alt="" /><p>{watch.dislikes}</p></button>
                <button className='sharebtn'><img className='shareimg' src="/src/images/asideimages/share.png" alt="" /><p>Share</p></button>
                
            </div>
        </div>

        <div>
            <div className='viewsvideo'>
                <p>{watch.views}</p>
                <p>{watch.updatedAt}</p>
            </div>
            <p className='ddesc'>
            {watch.description}
            </p>
            
            </div>

         <div className='comntsdiv'>
            <p className='totalcmnts'>{watch.comments?.length} Comments</p>

            <div>
                <div>
                    <img src="" alt="" />
                    <input type="text" />
                </div>

                <div>
                    <button>cancel</button>
                    <button>Comment</button>
                </div>
                <div>
                    <Comments comments={watch.comments}  />
         

                </div>

            </div>
            </div>
  
    </div>
   

    </div>
    <div className='videocontainer3'>
        <Miniasidevideolist/>
         

    </div>


    </div>
  )
}

export default Videoplayerpage