// Importing React and hooks
import React, { useState } from "react";

// Importing react-hook-form for form validation
import { useForm } from "react-hook-form";

// Importing CSS specific to channel creation page
import "/src/css/channel.css";

// Axios for making API calls
import axios from "axios";

// Router hook to navigate after successful channel creation
import { useNavigate } from "react-router-dom";

// Component for creating a new channel
const Createchannel = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Setting up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors } // To access form validation errors
  } = useForm();

  const [preview, setPreview] = useState(null);       // Preview URL for channel image
  const [channelImage, setChannelImage] = useState(null); // Actual file to send to backend

  // Handle when user selects an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChannelImage(file);                // Save file for submission
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!channelImage) {
      alert("Please select a channel image");
      return;
    }

    // Prepare form data for backend
    const formData = new FormData();
    formData.append("channelName", data.channelName);
    formData.append("channelDescription", data.description || "");
    formData.append("channelprofile", channelImage); // Must match backend field

    try {
      // POST request to backend
      const res = await axios.post(
        "http://localhost:8085/createchannel",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // JWT token for authentication
          }
        }
      );

      // On success, navigate to the channel list page
      if (res.status === 201) {
        console.log("Channel created:", res.data);
        navigate("/viewchannels");
      }

    } catch (err) {
      console.error("Create channel error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="channel-container">
      {/* Channel creation form */}
      <form className="channel-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create your channel</h2>
        <p className="subtitle">
          Choose a name, description and profile picture
        </p>

        {/* Channel Image Upload */}
        <div className="channel-pic-wrapper">
          <label htmlFor="channelImage">
            <img
              src={
                preview ||
                "https://www.gstatic.com/youtube/img/creator/default_channel.png" // Default image if no preview
              }
              alt="channel"
              className="channel-pic"
            />
          </label>

          <input
            type="file"
            id="channelImage"
            accept="image/*"
            hidden
            onChange={handleImageChange} // Handle file selection
          />
          <p className="upload-text">Upload channel picture</p>
        </div>

        {/* Channel Name Input */}
        <input
          type="text"
          placeholder="Channel name"
          className="input"
          {...register("channelName", {
            required: "Channel name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters"
            }
          })}
        />
        {errors.channelName && (
          <p className="error-text">{errors.channelName.message}</p>
        )}

        {/* Channel Description */}
        <textarea
          placeholder="Channel description (optional)"
          className="textarea"
          {...register("description")}
        />

        {/* Submit Button */}
        <button type="submit" className="create-btn">
          Create Channel
        </button>
      </form>
    </div>
  );
};

// Export the component
export default Createchannel;
