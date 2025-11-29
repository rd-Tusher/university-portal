import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Teacher/Sidebar";
import Hamburger from "./Hamburger";
import { useAppData } from "../Utils/CreateContext";

function Layout() {
  const {showHam, setShowHam,activeRoom,setActiveRoom,roomInfo} = useAppData();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center me-3">
        <i
          onClick={() => setShowHam((prev) => !showHam)}
          className={`mt-2 z-2 bi ${  showHam ? "bi-x" : "bi-justify"} invisible-lg`}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        ></i>
      </div>
      {showHam && (
        <div className={`hambg ${showHam ? "active" : ""} d-lg-none`}>
          <Hamburger
            activeRoom={activeRoom}
            setActiveRoom={setActiveRoom}
            roomInfo={roomInfo ?? []}
          />
        </div>
      )}
      <div className="row">
        <div className="col-lg-2 d-none d-lg-block">
          <Sidebar />
        </div>
        <div className="col-12 col-md-12 col-lg-10 min-vh-100 mt-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
