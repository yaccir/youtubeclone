import React, { useEffect, useState } from "react";
import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setburger, setsearch, settoken } from "../utils/youtubedataslice";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();
  const [picc,setpicc]=useState(localStorage.getItem("pic"));

  // Redux state: the search input stored in global store
  const searchinput = useSelector((store) => store.youtube.searchinput);

  // Local state for controlled search input
  const [inputfrsearch, setinputfrsearch] = useState("");

  // Get token from localStorage to check if user is signed in
  const sinout = localStorage.getItem("token");

  // Example effect that could run if token exists (currently empty axios call)

  // Handle search button click
  function handlesearchchange(e) {
    // Save the current input to Redux store for global usage
    if(e.target.value=="")
    {
    alert("invalid input")
    }
    dispatch(setsearch(inputfrsearch));
    setinputfrsearch(""); // Clear the input after searching
  }

  // Navigate to create channel page (if logged in), otherwise redirect to sign-in
  function handlechannel() {
    if (sinout) navigate("/createchannel");
    else navigate("/signin");
  }

  // Navigate to the user's channels page
  function handleviewchannel() {
    navigate("/viewchannels");
  }

  // Navigate to the sign-in page
  function handlesignin() {
    navigate("/signin");
  }

  // Handle user sign-out
  function handlesignout() {
    localStorage.removeItem("token");
    localStorage.removeItem("pic");
    settoken(!sinout); // Update Redux (optional)
    navigate("/"); // Redirect to homepage
  }

  // Navigate to home page when logo is clicked
  function gotohome() {
    navigate("/");
  }

  return (
    <header className="headercontainer">
      {/* LEFT SECTION */}
      <div className="burgercontainer">
        {/* Burger menu for responsive sidebar */}
        <button
          className="burgerbutton"
          onClick={() => dispatch(setburger())}
          aria-label="Open menu"
        >
          <img className="imageburger" src="/src/images/burger.png" alt="Menu" />
        </button>

        {/* YouTube logo: clicking navigates home */}
        <div onClick={gotohome} className="iconcontainer">
          <img className="imageicon" src="/src/images/icon.png" alt="YouTube Logo" />
          <h1 className="iconname">YouTube</h1>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className="searchmcont">
        <form className="searchcontt" onSubmit={(e) => e.preventDefault()}>
          <input
            className="searchinput"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={inputfrsearch} // Controlled input
            onChange={(e) => setinputfrsearch(e.target.value)}
          />

          {/* Search button triggers handlesearchchange */}
          <button
            className="searchbtn"
            onClick={handlesearchchange}
            aria-label="Search"
          >
            <img className="searchicon" src="/src/images/searchicon.jpg" alt="Search" />
          </button>
        </form>
      </div>

      {/* RIGHT SECTION: buttons for user actions */}
      <div className="button-container">
        {/* Create channel button */}
        <button onClick={handlechannel} className="btnheader">
          Create Channel
        </button>

        {/* View channels button, visible only if logged in */}
        <button onClick={handleviewchannel} className={sinout ? "btnheader" : "vis2"}>
          View Channels
        </button>

        {/* Sign-in button, hidden if already signed in */}
        <button onClick={handlesignin} className={sinout ? "vis2" : "signin btnheader"}>
          <img className="signinimage" src="/src/images/signin.png" alt="Sign in" />
          <span>Sign in</span>
        </button>

        {/* Sign-out button, visible only if logged in */}
        <div className={sinout ? "signin btnheader" : "vis2"}>
         {!picc && <img className="signinimage" src="/src/images/signin.png" alt="Sign in" />}
         {picc && <img className="signinimage" src={picc} alt="Sign in" />}
         
          <button onClick={handlesignout}>Sign out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
