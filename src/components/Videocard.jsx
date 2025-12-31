import React from 'react'
import "/src/css/videocard.css"
const Videocard = () => {
  return (
   <div className='parentvideocard'>


                <div className='imagethumbcont'>
                    <img className='thumbnailvideo' src="/src/images/thumb.jpg" alt="" />
                </div>
                <div className='detailsconttaboutvideo'>
                    <div >
                        <img className='channeliconuser' src="/src/images/icon.png" alt="" />
                    </div>
                    <div className='details2'>
                        <h2 className='title2'>title of the video</h2>
                        <h3 className='uploadername'>name of uploader</h3>
                        <div className='viewscont'>
                            <p>views</p>
                            <p>time ago</p>
                        </div>
                    </div>
                </div>



   </div>
  )
}

export default Videocard