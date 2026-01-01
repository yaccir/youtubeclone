import React from 'react'
import "/src/css/videocard.css"
const Videocard = ({description,dislikes,time,thumbNail,title,videoUrl,views,channelName,id }) => {
  return (
   <div className='parentvideocard'>


                <div className='imagethumbcont'>
                    <img className='thumbnailvideo' src={thumbNail} alt="" />
                </div>
                <div className='detailsconttaboutvideo'>
                    <div >
                        <img className='channeliconuser' src={thumbNail} alt="" />
                    </div>
                    <div className='details2'>
                        <h2 className='title2'>{title}</h2>
                        <h3 className='uploadername'>{channelName}</h3>
                        <div className='viewscont'>
                            <p>{views}</p>
                            <p>{time}</p>
                        </div>
                    </div>
                </div>



   </div>
  )
}

export default Videocard