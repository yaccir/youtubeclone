import React from "react";
import "../css/header.css";

const Header = () => {
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
        <button className="btnheader">Create Channel</button>

        <button className="signin btnheader">
          <img
            className="signinimage"
            src="/src/images/signin.png"
            alt="Sign in"
          />
          <span>Sign in</span>
        </button>
      </div>

    </header>
  );
};

export default Header;
