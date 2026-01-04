import React, { useState } from 'react';
import Asidesection from './Asidesection';
import Videocards from './Videocards';
import "/src/css/home.css";

const Home = () => {
  // State to track which category of videos is selected
  const [category, setCategory] = useState("all");

  return (
    <div className='maindashboard'>
      {/* Sidebar section */}
      <Asidesection />

      {/* Main content */}
      <div className='containerr1'>
        {/* Top category buttons */}
        <div className='tpbtnscontain'>
          <button className="topbtns" onClick={() => setCategory("all")}>All</button>
          <button className="topbtns" onClick={() => setCategory("Technology")}>Technology</button>
          <button className="topbtns" onClick={() => setCategory("Education")}>Education</button>
          <button className="topbtns" onClick={() => setCategory("Gaming")}>Gaming</button>
          <button className="topbtns" onClick={() => setCategory("Entertainment")}>Entertainment</button>
          <button className="topbtns" onClick={() => setCategory("Music")}>Music</button>
        </div>

        {/* Video list */}
        <Videocards category={category} />
      </div>
    </div>
  );
};

export default Home;
