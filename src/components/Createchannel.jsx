import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "/src/css/channel.css";
import axios from "axios";

const Createchannel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [channelImage, setChannelImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChannelImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!channelImage) {
      alert("Please select a channel image");
      return;
    }

    const formData = new FormData();
    formData.append("channelName", data.channelName);
    formData.append("channelDescription", data.description || "");
    formData.append("channelprofile", channelImage); // MUST match backend

    try {
      const res = await axios.post(
        "http://localhost:8085/createchannel",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Channel created:", res.data);
    } catch (err) {
      console.error("Create channel error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="channel-container">
      <form className="channel-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create your channel</h2>
        <p className="subtitle">
          Choose a name, description and profile picture
        </p>

        {/* Channel Image */}
        <div className="channel-pic-wrapper">
          <label htmlFor="channelImage">
            <img
              src={
                preview ||
                "https://www.gstatic.com/youtube/img/creator/default_channel.png"
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
            onChange={handleImageChange}
          />
          <p className="upload-text">Upload channel picture</p>
        </div>

        {/* Channel Name */}
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

        {/* Description */}
        <textarea
          placeholder="Channel description (optional)"
          className="textarea"
          {...register("description")}
        />

        <button type="submit" className="create-btn">
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default Createchannel;
