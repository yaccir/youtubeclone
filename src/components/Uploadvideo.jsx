import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "/src/css/uploadvideo.css";

const Uploadvideo = () => {
  // Initialize react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // State to store previews for thumbnail and video
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  /* Cleanup object URLs to prevent memory leaks when component unmounts */
  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [thumbnailPreview, videoPreview]);

  // Form submission handler
  const onSubmit = async (data) => {
    const formData = new FormData(); // Use FormData to send files

    // Append all form fields to FormData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("thumbnail", data.thumbnail[0]); // Thumbnail file
    formData.append("video", data.video[0]);         // Video file

    /* Retrieve token from localStorage and remove any quotes */
    let token = localStorage.getItem("token");
    token = token?.replace(/"/g, "");

    try {
      // POST request to backend to upload video
      const res = await axios.post("http://localhost:8085/videolist", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      // Notify success
      if (res.status === 201) alert("video uploaded successfully");

      // Reset form and previews
      reset();
      setThumbnailPreview(null);
      setVideoPreview(null);

    } catch (error) {
      // Handle errors (backend or network)
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  // Preview thumbnail when user selects an image
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailPreview(file ? URL.createObjectURL(file) : null);
  };

  // Preview video when user selects a video file
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Upload Video</h2>

      {/* Video title input */}
      <input
        type="text"
        placeholder="Title"
        className="form-input"
        {...register("title", { required: true })}
      />

      {/* Video description input */}
      <input
        type="text"
        placeholder="Description"
        className="form-input"
        {...register("description", { required: true })}
      />

      {/* Video category selector */}
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

      {/* Thumbnail upload input */}
      <input
        type="file"
        accept="image/*"
        className="form-input"
        {...register("thumbnail", { required: true })}
        onChange={handleThumbnailChange} // Update preview
      />

      {/* Thumbnail preview */}
      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          alt="Thumbnail Preview"
          className="thumbnail-preview"
        />
      )}

      {/* Video file upload input */}
      <input
        type="file"
        accept="video/*"
        className="form-input"
        {...register("video", { required: true })}
        onChange={handleVideoChange} // Update preview
      />

      {/* Video preview */}
      {videoPreview && (
        <video
          src={videoPreview}
          controls
          className="video-preview"
        />
      )}

      {/* Submit button */}
      <button type="submit" className="upload-button">
        Upload
      </button>
    </form>
  );
};

export default Uploadvideo;
