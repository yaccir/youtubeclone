import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/css/viewChannels.css";
import { useNavigate } from "react-router-dom";

const ViewChannels = () => {
  const navigate = useNavigate(); // to navigate to a specific channel page
  const [channels, setChannels] = useState([]); // state to store all channels
  const [loading, setLoading] = useState(true); // loading state
  console.log(channels._);

  // Fetch all channels on component mount
  useEffect(() => {
    fetchChannels();
  }, []);

  // Navigate to a specific channel's page when a channel card is clicked
  function handlechannelclick(id) {
    navigate(`/viewchannel/${id}`);
  }

  // Function to fetch all channels from backend
  const fetchChannels = async () => {
    try {
      const token = localStorage.getItem("token"); // get user token

      // Send GET request to fetch all channels with auth token
      const res = await axios.get("http://localhost:8085/viewchannels", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setChannels(res.data); // store fetched channels in state
    } catch (error) {
      console.error("Error fetching channels", error);
    } finally {
      setLoading(false); // set loading to false regardless of success/error
    }
  };

  // Display loading message while channels are being fetched
  if (loading) {
    return <p className="loading">Loading channels...</p>;
  }

  return (
    <div className="channels-container">
      <h2>All Channels</h2>

      {channels.length === 0 ? (
        <p>No channels found</p> // Show message if no channels exist
      ) : (
        <div className="channels-grid">
          {channels.map((channel) => (
            <div
              className="channel-card"
              onClick={() => handlechannelclick(channel._id)} // click navigates to channel view
              key={channel._id}
            >
              <img
                src={`http://localhost:8085${channel.channelprofile}`} // channel profile image
                alt={channel.channelName}
                className="channel-image"
              />
              <h3>{channel.channelName}</h3> {/* channel name */}
              <p>{channel.channelDescription}</p> {/* channel description */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewChannels;
