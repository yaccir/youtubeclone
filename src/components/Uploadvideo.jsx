import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "/src/css/uploadvideo.css";

const Uploadvideo = () => {
  const { register, handleSubmit, reset } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  /* 🧹 Cleanup object URLs */
  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [thumbnailPreview, videoPreview]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("video", data.video[0]);

    /* 🔐 Sanitize token */
    let token = localStorage.getItem("token");
    token = token?.replace(/"/g, "");

    try {
    const res=  await axios.post("http://localhost:8085/videolist", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(res.status==201)
        alert("video uploaded successfully")

      console.log("Video uploaded successfully");
      reset();
      setThumbnailPreview(null);
      setVideoPreview(null);

    } catch (error) {
      console.error(
        "Upload failed:",
        error.response?.data || error.message
      );
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Upload Video</h2>

      <input
        type="text"
        placeholder="Title"
        className="form-input"
        {...register("title", { required: true })}
      />

      <input
        type="text"
        placeholder="Description"
        className="form-input"
        {...register("description", { required: true })}
      />

      <select
        className="form-input"
        {...register("category", { required: true })}
        defaultValue=""
      >
        <option value="" disabled>Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Gaming">Gaming</option>
        <option value="Music">Music</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="file"
        accept="image/*"
        className="form-input"
        {...register("thumbnail", { required: true })}
        onChange={handleThumbnailChange}
      />

      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          alt="Thumbnail Preview"
          className="thumbnail-preview"
        />
      )}

      <input
        type="file"
        accept="video/*"
        className="form-input"
        {...register("video", { required: true })}
        onChange={handleVideoChange}
      />

      {videoPreview && (
        <video
          src={videoPreview}
          controls
          className="video-preview"
        />
      )}

      <button type="submit" className="upload-button">
        Upload
      </button>
    </form>
  );
};

export default Uploadvideo;
