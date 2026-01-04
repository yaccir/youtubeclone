// Importing React for component creation
import React from 'react';

// Importing CSS specific to the aside section
import "/src/css/aside.css";

// Importing useSelector from Redux to access global state
import { useSelector } from 'react-redux';

// Component for the left-hand sidebar (aside section)
const Asidesection = () => {
  // Accessing the "burger" state from the youtube slice to handle responsive show/hide
  const fl = useSelector((store) => store.youtube.burger);

  return (
    // Toggle class based on burger menu state: hide if true, show aside section if false
    <div className={fl ? "hdn" : 'asidesection'}>

      {/* Main navigation buttons */}
      <div>
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/home.gif" alt="Home" />
            <p className="paraaside">Home</p>
          </button>
        </div>
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/shorts.png" alt="Shorts" />
            <p className="paraaside">Shorts</p>
          </button>
        </div>
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/subscriptions.png" alt="Subscriptions" />
            <p className="paraaside">Subscriptions</p>
          </button>
        </div>
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/signin.png" alt="You" />
            <p className="paraaside">You</p>
          </button>
        </div>
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/history.png" alt="History" />
            <p className="paraaside">History</p>
          </button>
        </div>
      </div>

      {/* Sign-in prompt for unauthenticated users */}
      <div className='signindiv'> 
        <p className='alonetextinfo'>
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className='asidebtns'>
          <img className='asideimages' src="/src/images/signin.png" alt="Sign in" />
          <p className='alonesignin'>Sign in</p>
        </button>
      </div>

      {/* Explore section with categories */}
      <div>
        <h3 className='explore'>Explore</h3>

        {/* Explore buttons */}
        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/shopping.png" alt="Shopping" />
            <p className="paraaside">Shopping</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/music.png" alt="Music" />
            <p className="paraaside">Music</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/movies.png" alt="Movies" />
            <p className="paraaside">Movies</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/live.png" alt="Live" />
            <p className="paraaside">Live</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/gaming.png" alt="Gaming" />
            <p className="paraaside">Gaming</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/news.png" alt="News" />
            <p className="paraaside">News</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/sports.gif" alt="Sports" />
            <p className="paraaside">Sports</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/degree.png" alt="Courses" />
            <p className="paraaside">Courses</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/fashion.png" alt="Fashion & Beauty" />
            <p className="paraaside">Fashion & Beauty</p>
          </button>
        </div>

        <div>
          <button className='asidebtns'>
            <img className='asideimages' src="/src/images/asideimages/podcast.png" alt="Podcasts" />
            <p className="paraaside">Podcasts</p>
          </button>
        </div>
      </div>

    </div>
  )
}

// Exporting the aside section component
export default Asidesection;
