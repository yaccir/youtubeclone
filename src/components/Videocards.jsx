import React from 'react'
import "/src/css/Videocards.css"
import Videocard from './Videocard'

const Videocards = () => {
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