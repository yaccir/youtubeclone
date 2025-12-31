import React from 'react'
import "/src/css/minivideolist.css"

const Miniasidevideolist = () => {
  return (
    <div className='videolistcard'>

    <img className='thumbnailimage' src="/src/images/thumb.jpg" alt="" />
    <div className='videodetailss'>
        <h2 className='minititle'>title of video</h2>
        <h3 className='minichannelname'>channel name</h3>
        <div>
            <p>views</p>
            <p>time ago</p>
        </div>

    </div>


    </div>
  )
}

export default Miniasidevideolist