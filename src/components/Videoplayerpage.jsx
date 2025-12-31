import React from 'react'
import "/src/css/videoplayerpage.css"
import Miniasidevideolist from './Miniasidevideolist'
import Comments from './Comments'

const Videoplayerpage = () => {
  return (
    <div className='main-video-container'>

    <div className='videocontainer2'>
        <div>
        <video className='videoplayer' src="/src/css/qq.mp4"></video>
        <h1>title of the video</h1>
       <div className='sbbtn'>

         <div className='videosubscribecont'>
            <img className='usersubscribeicon' src="/src/images/icon.png" alt="" />
            <div>
                <h2>channel name</h2>
                <p>subscribers</p>
            </div>
            <button className='subscribebtn'>Subscribe</button>

       </div>

            <div className='thumbsupcontainer'>
                <button className='likecalculations' ><img className='like' src="/src/images/asideimages/thumbsup.png" alt="" /><p>283k</p></button>
                <button className='unlikebtnn'><img className='unlikecalculations' src="/src/images/asideimages/thumbsupun.png" alt="" /></button>
                <button className='sharebtn'><img className='shareimg' src="/src/images/asideimages/share.png" alt="" /><p>Share</p></button>
                
            </div>
        </div>

        <div className='ddesc'>
            <div className='viewsvideo'>
                <p>views</p>
                <p>time</p>
            </div>
            <p >
                description
            </p>
            
            </div>

         <div className='comntsdiv'>
            <p className='totalcmnts'>total comments</p>

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
                    <Comments/>
                      <Comments/>
                        <Comments/>
                          <Comments/>
                            <Comments/>
                              <Comments/>
                                <Comments/>
                                  <Comments/>

                </div>

            </div>
            </div>
    </div>
    <div className='videocontainer3'>
        <Miniasidevideolist/>
         <Miniasidevideolist/>
          <Miniasidevideolist/>
           <Miniasidevideolist/>
            <Miniasidevideolist/>
             <Miniasidevideolist/>

    </div>

    </div>
   


    </div>
  )
}

export default Videoplayerpage