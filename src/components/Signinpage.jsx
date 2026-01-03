import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "/src/css/sigin.css";
import { useNavigate } from "react-router-dom";
import { settoken } from "../utils/youtubedataslice";
import { useDispatch } from "react-redux";

const Signinpage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [isRegister, setIsRegister] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const openRegister = () => setIsRegister(!isRegister);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (profileFile) formData.append("profilepic", profileFile);

        const res = await axios.post(
          "http://localhost:8085/register",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("REGISTER RESPONSE:", res.data);
      } else {
        const res = await axios.post("http://localhost:8085/login", {
          email: data.email,
          password: data.password
        });

        console.log("LOGIN RESPONSE:", res.data);

        if(res.data.token)
        {
          localStorage.setItem("token",res.data.token);
          dispatch(settoken(true))

          navigate("/")
        }
        else
        {
          navigate("/signin")
        }
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="signin-container">
      <form
        className="signin-box"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          className="logo"
        />

        <h2>{isRegister ? "Create Account" : "Sign in"}</h2>
        <p className="subtitle">to continue to YouTube</p>

        {isRegister && (
          <>
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

        <input
          className="input"
          placeholder="Email"
          {...register("email", { required: "Email required" })}
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}

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

        <button className="signin-btn" type="submit">
          {isRegister ? "Register" : "Sign in"}
        </button>

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
