import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { getClassRoomInfo } from "../../Utils/ClassRoomUtils";
import { useAppData } from "../../Utils/CreateContext";

function Sidebar() {
  const [roomInfo, setRoomInfo] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const {activeRoom, setActiveRoom} = useAppData();

  useEffect(() => {
    const fetchRoomInfo = async () => {
    const data =  await getClassRoomInfo();
    setRoomInfo(data);
    };

    fetchRoomInfo();
  }, []);

  return (
    <div className="sidebar">

      <p className="pt-3 fw-600 pointer text-decoration-none">
      <Link  className="text-decoration-none text-dark" to ="/today's/schedule"  onClick={()=>setActiveRoom(null)}
><i className="bi bi-house-door"></i> Home</Link>  
      </p>

      <p  className="room fw-600 mb-0 pointer"  onClick={() => setOpenMenu(!openMenu)}>
        Created Rooms     <span className={`bi bi-chevron-${openMenu ? "up" : "down"}`}></span>
      </p>

      <ul className={`custom-dropdown ${openMenu ? "show" : ""}`}>
        {Array.isArray(roomInfo) && roomInfo.length > 0 ? (
          roomInfo.map((room, index) => (
            <li
              key={index}
              onClick={() => setActiveRoom(room.roomTitle)}
              className={`room-title  pointer mb-0 ${  activeRoom === room.roomTitle ? " text-primary" : ""
              }`} >
             <Link className="text-decoration-none text-dark" to="/teacher/classroom">{room.roomTitle}</Link> 
             {/* {room.roomTitle} */}
            </li>
          ))
        ) : (
          <li className="text-center p-2">
            <div className="spinner"></div>
          </li>
        )}
      </ul>

    </div>
  );
}

export default Sidebar;
