import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "/src/css/sigin.css";
import { useNavigate } from "react-router-dom";
import { settoken } from "../utils/youtubedataslice";
import { useDispatch } from "react-redux";

const Signinpage = () => {
  const navigate = useNavigate(); // For page navigation
  const dispatch = useDispatch(); // To update Redux store

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [preview, setPreview] = useState(null);        // Preview of profile picture
  const [profileFile, setProfileFile] = useState(null); // Stores selected profile image file

  // Toggle between login and registration forms
  const openRegister = () => setIsRegister(!isRegister);

  // Handle profile image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);               // Save file for form submission
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Cleanup preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Form submission handler for login or registration
  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        // Registration
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (profileFile) formData.append("profilepic", profileFile); // Optional profile pic

        // Send registration request to backend
        const res = await axios.post(
          "http://localhost:8085/register",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if(res.status === 201) {
          setIsRegister(false); // Switch back to login form
          alert("user registered successfully"); 
          reset(); // Clear form inputs
        }
      } else {
        // Login
        const res = await axios.post("http://localhost:8085/login", {
          email: data.email,
          password: data.password
        });
        console.log(res.data)

        // Save token in localStorage and update Redux store
        if(res.data.token) {
          localStorage.setItem("token", res.data.token);
          dispatch(settoken(res.data.token));
          navigate("/"); // Redirect to homepage
        } else {
          navigate("/signin"); // Stay on login page if login fails
        }
      }
    } catch (err) {
      console.error(err.response?.data || err.message); // Log backend or network errors
    }
  };

  return (
    <div className="signin-container">
      <form
        className="signin-box"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {/* YouTube Logo */}
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          className="logo"
        />

        <h2>{isRegister ? "Create Account" : "Sign in"}</h2>
        <p className="subtitle">to continue to YouTube</p>

        {/* Registration-specific inputs */}
        {isRegister && (
          <>
            {/* Profile picture upload */}
            <div className="profile-pic-wrapper">
              <label htmlFor="profilePic">
                <img
                  src={
                    preview ||
                    "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
                  }
                  className="profile-pic"
                />
              </label>
              <input
                type="file"
                id="profilePic"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              <p>Add profile photo</p>
            </div>

            {/* Full name input */}
            <input
              className="input"
              placeholder="Full Name"
              {...register("fullname", {
                required: isRegister && "Full name required"
              })}
            />
            {errors.fullname && (
              <p className="error-text">{errors.fullname.message}</p>
            )}
          </>
        )}

        {/* Email input */}
        <input
          className="input"
          placeholder="Email"
          {...register("email", { required: "Email required" })}
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}

        {/* Password input */}
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
            minLength: { value: 6, message: "Min 6 characters" }
          })}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}

        {/* Submit button */}
        <button className="signin-btn" type="submit">
          {isRegister ? "Register" : "Sign in"}
        </button>

        {/* Footer links */}
        {!isRegister && (
          <div className="footer-links">
            <button type="button" onClick={openRegister}>
              Create account
            </button>
            <button type="button">Forgot Password</button>
          </div>
        )}
        
        {isRegister && (
          <div className="footer-links">
            <button type="button" style={{marginLeft:"43%", cursor:"pointer", color:"blue"}} onClick={openRegister}>
              Sign in instead
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signinpage;
