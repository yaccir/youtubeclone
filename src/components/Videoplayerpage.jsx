import React from 'react'
import "/src/css/videoplayerpage.css"

const Videoplayerpage = () => {
  return (
    <div className='main-video-container'>

    <div className='videocontainer2'>
        <div>
        <video className='videoplayer' src="/src/css/qq.mp4"></video>
        <h1>title of the video</h1>
        <div>
            <img src="" alt="" />
            <div>
                <h2>channel name</h2>
                <p>subscribers</p>
            </div>
            <button>Subscribe</button>

            <div>
                <button><img src="" alt="" /><p>283k</p></button>
                <button><img src="" alt="" /></button>
                <button><img src="" alt="" /><p>Share</p></button>
                
            </div>
        </div>

        <div>
            <div>
                <p>views</p>
                <p>time</p>
            </div>
            <p>
                description
            </p>
            
            </div>

         <div>
            <p>total comments</p>

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
                    
                </div>

            </div>
            </div>
    </div>
    <div className='videocontainer3'>
        div 2
    </div>

    </div>
   


    </div>
  )
}

export default Videoplayerpage