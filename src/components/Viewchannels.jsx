import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/css/viewChannels.css";
import { useNavigate } from "react-router-dom";

const ViewChannels = () => {
    const navigate=useNavigate()
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(channels._)
  useEffect(() => {
    fetchChannels();
  }, []);

  function handlechannelclick(id)
  {
    navigate(`/viewchannel/${id}`)
  }

const fetchChannels = async () => {
  try {
    const token = localStorage.getItem("token"); // or sessionStorage

    const res = await axios.get("http://localhost:8085/viewchannels", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setChannels(res.data);
  
  } catch (error) {
    console.error("Error fetching channels", error);
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return <p className="loading">Loading channels...</p>;
  }

  return (
    <div className="channels-container">
      <h2>All Channels</h2>

      {channels.length === 0 ? (
        <p>No channels found</p>
      ) : (
        <div className="channels-grid" >
          {channels.map((channel) => (
            <div className="channel-card" onClick={()=>{handlechannelclick(channel._id)}} key={channel._id}>
              <img
                src={`http://localhost:8085${channel.channelprofile}`}
                alt={channel.channelName}
                className="channel-image"
              />
              <h3>{channel.channelName}</h3>
              <p>{channel.channelDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewChannels;
