import React from 'react'
import Asidesection from './Asidesection'
import Videocards from './Videocards'
import "/src/css/home.css"

const Home = () => {
  return (
    <div className='maindashboard'>

        <Asidesection/>
        <Videocards/>
    </div>
  )
}

export default Home