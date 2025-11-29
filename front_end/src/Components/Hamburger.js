import React, { useEffect } from 'react'
import { getClassRoomInfo } from '../Utils/ClassRoomUtils';
import { useAppData } from '../Utils/CreateContext';
import { Link } from 'react-router-dom';

function Hamburger() {
    const {activeRoom, setActiveRoom,roomInfo,setRoomInfo} = useAppData();
      useEffect(() => {
        const fetchRoomInfo = async () => {
        const data =  await getClassRoomInfo();
        setRoomInfo(data);
        };
    
        fetchRoomInfo();
      }, []);
  return (
        <>
        <p className="pt-3 fw-600 pointer text-decoration-none">
            <Link
              className="text-decoration-none text-dark" 
              to ="/today's/schedule"
              onClick={()=>setActiveRoom(null)}
              >
             <i className="bi bi-house-door"></i> Home</Link>  
        </p>
            <p className="room fw-600 mb-0">Created Room</p>
            <ul className="sidebar">
                {
                    Array.isArray(roomInfo) && roomInfo?.length > 0 ? (
                        roomInfo.map((room,index)=>{
                            return (
                                <li 
                                    key={index} 
                                    onClick={() => {setActiveRoom(room.roomTitle)}}
                                    className={`room-title option ${activeRoom === room.roomTitle ? " active text-primary" : ''}`} 
                                    title={room.roomTitle}
                                    >
                                 <Link className="text-decoration-none text-dark" to="/teacher/classroom">{room.roomTitle}</Link> 

                                </li>
                            )
                        })
                    ) : ( <div className="spinner text-center mt-5"></div>)
                }
            </ul>
        </>
  )
}

export default Hamburger; 