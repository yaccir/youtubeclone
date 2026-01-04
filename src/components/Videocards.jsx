import React, { useEffect } from 'react';
import "/src/css/Videocards.css";
import Videocard from './Videocard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchvid, setsearch } from '../utils/youtubedataslice';

const Videocards = ({ category }) => {
  const dispatch = useDispatch();

  // Array of videos from Redux store
  const videos = useSelector(store => store.youtube.items || []);

  // Search input from Redux store
  const searchedvideos = useSelector(store => store.youtube.searchinput);
  console.log(searchedvideos);
  console.log(videos);

  useEffect(() => {
    // Async function to fetch videos from backend
    const fetchVideos = async () => {
      try {
        // If a category is selected, fetch videos by category
        if (category) {
          dispatch(setsearch("")); // Reset search input when category changes

          const res = await axios.get(`http://localhost:8085/videolist/${category}`);
          console.log("01 i am hit");
          dispatch(fetchvid(res.data.videos || []));
        }

        // If search input is not empty, fetch videos by search term
        if (searchedvideos !== "") {
          const res = await axios.get(`http://localhost:8085/videolist/search/${searchedvideos}`);
          console.log("03 i am hit" + searchedvideos);
          dispatch(fetchvid(res.data.videos || []));
        }
      } catch (error) {
        console.error("Video fetch failed:", error);
      }
    };

    // Call the fetch function
    fetchVideos();
  }, [dispatch, category, searchedvideos]); // Run when category or search input changes

  return (
    <div className="parentgrid">
      {/* Display message if search input is active */}
      {searchedvideos !== "" && <p>hello world</p>}

      {/* Display message if no videos available */}
      {videos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No videos available</p>
      ) : (
        // Map through videos and render Videocard component for each
        videos.map((video) => (
          <Videocard
            key={video._id}
            id={video._id}
            channelName={video.channelName || "Unknown Channel"}
            channelProfile={video.channelProfile}
            thumbNail={
              video.thumbnailUrl ||
              "https://www.gstatic.com/youtube/img/creator/default_channel.png"
            }
            title={video.title}
            views={video.views || 0}
            time={video.updatedAt}
          />
        ))
      )}
    </div>
  );
};

export default Videocards;
