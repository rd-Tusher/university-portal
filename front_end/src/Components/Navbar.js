import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [showNavbar, setSetshowNavbar] = useState(false);
  const toggleNavbar = ()=> {
    setSetshowNavbar(!showNavbar);
    console.log('clicked')
  }
  return (
    <div>
      <div className="wrapper pt-0 p-4">
      <div className="navbar_div">
        <svg viewBox="0 0 64 64" width="50" height="50" className="v_logo">
          <circle cx="32" cy="20" r="12" />
          <path d="M16,52 C16,40 48,40 48,52 Z" />
        </svg>

        <div onClick={toggleNavbar}>
          <svg viewBox="0 0 64 64" width="50" height="50" className="v_logo cursor_pointer">
            <circle cx="32" cy="20" r="12" />
            <path d="M16,52 C16,40 48,40 48,52 Z" />
          </svg>
          <div className={`navbar_overlay ${showNavbar ? "visible" : ""} ${showNavbar ? "show" : ""}`} ></div>
        </div>
      </div>
      </div>
      <div onClick={toggleNavbar}>
        <div className={`text-light fixed ${showNavbar ? "show" : ""}`}>
          <ul>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/profile">Profile</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/course">Course</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/result">Result</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/notice">Notice</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/library">Events</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/resources">Resources</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/bill">Bill</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} >Switch Theme</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active text-info" : "text-white"} to="/logout">Log Out</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
