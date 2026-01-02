import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "/src/css/sigin.css";

const Signinpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [registername,setRegistername]=useState(false);

  function openreg()
  {
    setRegistername(true);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePic", profileFile);

    // axios.post("/api/auth/signin", formData)
    console.log("Form submitted");
  };

  return (
    <div className="signin-container">
      <form className="signin-box" onSubmit={handleSubmit(onSubmit)}>
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="YouTube"
          className="logo"
        />

        <h2>Sign in</h2>
        <p className="subtitle">to continue to YouTube</p>

        {/* Profile Picture */}
        <div className={registername?"profile-pic-wrapper":"vis"} >
          <label htmlFor="profilePic">
            <img
              src={
                preview ||
                "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
              }
              alt="profile"
              className="profile-pic"
            />
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            hidden
            
            onChange={handleImageChange}
          />
          <p className="upload-text">Add profile photo</p>
        </div>
        {/* {fullname} */}
        <input
          type="text"
          placeholder="Full Name"
          className= {registername?"input":"vis"}
          {...register("fullname", {
            required: "fullname is required"
          })}
        />

        {/* Email */}
        <input
          type="text"
          placeholder="Email or phone"
          className="input"
          {...register("email", {
            required: "Email is required"
          })}
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters"
            }
          })}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}

        <button type="submit" className="signin-btn">
          {registername?"Register":"Sign in"}
        </button>

        <div className="footer-links">
         <button onClick={openreg}>Create account</button>
          <button>Forgot Password</button>
        </div>
      </form>
    </div>
  );
};

export default Signinpage;
