import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import "/src/css/uploadvideo.css";

const Uploadvideo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { id } = useParams();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Cleanup object URLs
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

    let token = localStorage.getItem("token")?.replace(/"/g, "");

    try {
      const res = await axios.post(
        `http://localhost:8085/videolist/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("Video uploaded successfully");
        reset();
        setThumbnailPreview(null);
        setVideoPreview(null);
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Video upload failed");
    }
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
        defaultValue=""
        {...register("category", { required: true })}
      >
        <option value="" disabled>
          Select Category
        </option>
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
        {...register("thumbnail", {
          required: true,
          onChange: (e) =>
            setThumbnailPreview(URL.createObjectURL(e.target.files[0])),
        })}
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
        {...register("video", {
          required: true,
          onChange: (e) =>
            setVideoPreview(URL.createObjectURL(e.target.files[0])),
        })}
      />

      {videoPreview && (
        <video src={videoPreview} controls className="video-preview" />
      )}

      <button
        type="submit"
        className="upload-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Uploading video..." : "Upload Video"}
      </button>
    </form>
  );
};

export default Uploadvideo;
