import React from 'react'
import "/src/css/aside.css"

const Asidesection = () => {
  return (
    <div className='asidesection'>
            <div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/home.gif" alt="" />
                  <p className="paraaside" >Home</p></button></div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/shorts.png" alt="" />
                  <p className="paraaside" >Shorts</p></button></div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/subscriptions.png" alt="" />
                  <p className="paraaside" >Subscriptions</p></button></div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/signin.png" alt="" />
                  <p className="paraaside" >You</p></button></div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/history.png" alt="" />
                  <p className="paraaside" >History</p></button></div>
      </div>
      <div className='signindiv'> 
        <p className='alonetextinfo'>
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className='asidebtns' >
         <img className='asideimages' src="/src/images/signin.png" alt="" />
          <p className='alonesignin'>Sign in </p></button>
      </div>

        <div>
            <h3 className='explore'>Explore</h3>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/shopping.png" alt="" />
                  <p className="paraaside">Shopping</p></button></div> 
 
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/music.png" alt="" />
                  <p className="paraaside">Music</p></button></div>
     
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/movies.png" alt="" />
                  <p className="paraaside">Movies</p></button></div>
    
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/live.png" alt="" />
                  <p className="paraaside">Live</p></button></div>
      
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/gaming.png" alt="" />
                  <p className="paraaside">Gaming</p></button></div>
    
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/news.png" alt="" />
                  <p className="paraaside">News</p></button></div>
      
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/sports.gif" alt="" />
                  <p className="paraaside">Sports</p></button></div>
    
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/degree.png" alt="" />
                  <p className="paraaside">Courses</p></button></div>
   
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/fashion.png" alt="" />
                  <p className="paraaside">Fashion & Beauty</p></button>
                  </ div>
                <div><button className='asidebtns'>
                  <img className='asideimages' src="/src/images/asideimages/podcast.png" alt="" />
                  <p className="paraaside">Podcasts</p></button></div> 
 
        </div>

    </div>
  )
}

export default Asidesection