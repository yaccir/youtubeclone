import { useEffect } from "react";
import "/src/css/minivideolist.css";
import { useSelector } from 'react-redux';
import axios from "axios";

const Miniasidevideolist = () => {

  // useEffect currently empty — can be used later to fetch data if needed
  useEffect(() => {

  }, []);

  // Example async function placeholder (currently not used)
  async function foo() {
    const res = await axios(""); // Replace "" with actual API endpoint
    // handle the response if needed
  }

  // Get video items from Redux store
  const data = useSelector((store) => store.youtube.items || []);

  return (
    <>
      {/* Map through the video items and render each one */}
      {data.map((item) => {
        return (
          <div className='videolistcard' key={item._id /* Add a unique key */}>

            {/* Video thumbnail */}
            <img className='thumbnailimage' src={item.thumbNail} alt={item.title} />

            {/* Video details */}
            <div className='videodetailss'>
              <h2 className='minititle'>{item.title}</h2>
              <h3 className='minichannelname'>{item.channelName}</h3>

              {/* Video stats */}
              <div>
                <p>{item.views}</p>
                <p>{item.updatedAt}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Miniasidevideolist;
