import React from "react";
import { useState } from "react";
import ScheduleCT from "./scheduleCT.js";
import { CtMarkPreCheck } from "../../Components/Wrapper.js";
import AddCourses from "./AddCourses.js";
import AddClassTopic from "./AddClassTopic.js";
// import { useNavigate } from "react-router-dom";

function AdminControl() {
  const [ShowNav, setShowNav] = useState(false);
  const [ActiveComp, setActiveComp] = useState("AddClassTopic");
  // const navigate = useNavigate();

  const handleClick = () => {
    setShowNav(!ShowNav);
  };

  const handleNavClick = (nav) => {
    setShowNav(prev => !prev);
    setActiveComp(nav);
    // navigate("/check-ct-info")

  };

  const connectMap = {
    ScheduleCT: ScheduleCT,
    AddCourses : AddCourses,
    AddClassTopic : AddClassTopic,
    CtMarkPreCheck : CtMarkPreCheck
  };

  const ComptoRender = connectMap[ActiveComp];

  return (
    <>
      <nav>
        <div className={`hamburger text-light`} onClick={handleClick}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>

        <div className={`navbar_overlay d-lg-none ${ShowNav ? "visible" : ""} `}  onClick={handleClick}></div>
        <div className={`admin-nav ${ShowNav ? "d-show" : ""}`}>
          <ul>
            <li className="lsn" onClick={() => handleNavClick("ScheduleCT")}>  <small>Schedule Test</small> </li>
            <li className="lsn" onClick={() => handleNavClick("CtMarkPreCheck")}><small>Update Test Mark</small>   </li>
            <li className="lsn" onClick={() => handleNavClick("AddClassTopic")}><small>Add Class Topic</small>   </li>
            <li className="lsn" onClick={() => handleNavClick("AddCourses")}>  <small>Add Courses</small> </li>
          </ul>
        </div>
        <div className="p-4">
        {ComptoRender ?  (  <ComptoRender />  ) : (  <p>Page not found!</p>)}
   
        </div>

    </>
  );
}
 
export default AdminControl;
