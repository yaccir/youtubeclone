import React from "react";
import "../css/header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
const navigate=useNavigate();
function handlechannel()
{
  const token=localStorage.getItem("token")
  if(token)
  navigate("/createchannel")
else
  navigate("/signin");
  
}
function handlesignin()
{
navigate("/signin")
}
function handlesignout()
{
  localStorage.removeItem("token")
navigate("/")
}

  return (
    <header className="headercontainer">
      
      {/* LEFT SECTION */}
      <div className="burgercontainer">
        <button className="burgerbutton" aria-label="Open menu">
          <img
            className="imageburger"
            src="/src/images/burger.png"
            alt="Menu"
          />
        </button>

        <div className="iconcontainer">
          <img
            className="imageicon"
            src="/src/images/icon.png"
            alt="YouTube Logo"
          />
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
          />
          <button className="searchbtn" aria-label="Search">
            <img
              className="searchicon"
              src="/src/images/searchicon.jpg"
              alt=""
            />
          </button>
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="button-container">
        <button onClick={handlechannel} className="btnheader">Create Channel</button>

        <button onClick={handlesignin} className="signin btnheader">
          <img
            className="signinimage"
            src="/src/images/signin.png"
            alt="Sign in"
          />
          <span>Sign in</span>
        </button>
         <button onClick={handlesignout} className="signin btnheader">
          <img
            className="signinimage"
            src="/src/images/signin.png"
            alt="Sign in"
          />
          <span>Sign out</span>
        </button>
      </div>

    </header>
  );
};

export default Header;
