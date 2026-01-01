import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Uploadvideo = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit =  (data) => {
    // data contains text fields, NOT file itself

    const formData = new FormData();

    formData.append("video", data.video[0]); // VERY IMPORTANT
    formData.append("title", data.title);
    formData.append("thumbnail", data.thumbnail[0]);
      formData.append("description", data.description);
      console.log(formData);
    axios.post(
      "http://localhost:8085/videolist",
      formData
    ).then((res)=>{console.log("Video uploaded");});

    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
       <input
        type="file"
        placeholder="thumbnail"
        {...register("thumbnail", { required: true })}
      />
      

      <input
        type="text"
        placeholder="description"
        {...register("description", { required: true })}
      />

      <input
        type="file"
        accept="video/*"
        {...register("video", { required: true })}
      />

      <button type="submit">Upload</button>
    </form>
  );
};

export default Uploadvideo;
