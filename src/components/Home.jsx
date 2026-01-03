import React, { useState } from 'react';
import Asidesection from './Asidesection';
import Videocards from './Videocards';
import "/src/css/home.css";

const Home = () => {

  const [category, setCategory] = useState(null);

  return (
    <div className='maindashboard'>
      <Asidesection />

      <div className='containerr1'>
        <div className='tpbtnscontain'>

          <button className="topbtns" onClick={() => setCategory("all")}>All</button>
          <button className="topbtns" onClick={() => setCategory("Technology")}>Technology</button>
          <button className="topbtns" onClick={() => setCategory("Education")}>Education</button>
          <button className="topbtns" onClick={() => setCategory("Gaming")}>Gaming</button>
          <button className="topbtns" onClick={() => setCategory("Entertainment")}>Entertainment</button>
          <button className="topbtns" onClick={() => setCategory("Music")}>Music</button>

        </div>

        <Videocards category={category} />
      </div>
    </div>
  );
};

export default Home;
