import React from 'react'
import Asidesection from './Asidesection'
import Videocards from './Videocards'
import "/src/css/home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {


  return (
    <div className='maindashboard' >

        <Asidesection/>
        <div className='containerr1'>
          <div className='tpbtnscontain'>

            <buttons className="topbtns" >All</buttons >
            <buttons className="topbtns">Live</buttons >
            <buttons className="topbtns">Wickets</buttons >
            <buttons className="topbtns" >Gaming</buttons >
            <buttons className="topbtns">News</buttons >
            <buttons className="topbtns">Survival Skills</buttons >
            <buttons className="topbtns">Villages</buttons >
            <buttons className="topbtns">Factories</buttons >
            <buttons className="topbtns">Roasting</buttons >
            <buttons className="topbtns">Geography</buttons >
            <buttons className="topbtns">Mountaineering</buttons >
            <buttons className="topbtns">Action Thrillers</buttons >
            <buttons className="topbtns">Astronomy</buttons >

          </div>
        <Videocards/>
        </div>
       
    </div>
  )
}

export default Home