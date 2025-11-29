import axios from 'axios';

export const  fetchCourse = async()=>{
    const url = 'http://localhost:8080/fetch-course-name-id-by-teacher';
    try {
        const res = await axios.get(url,{withCredentials : true});
        const up = res?.data?.map(c =>({
            value : c.courseID,
            label : c.courseName
        }));

        sessionStorage.setItem("tCourse",JSON.stringify(up));
    } catch (error) {
        console.log(error);
    }

}

export const dateFormatter = (d) =>{
  const date = new Date(d);
  const options = { weekday : 'short', month : "short" , day : "2-digit",year: 'numeric'};
  const formatted = date?.toLocaleDateString('en-us',options);
  const flag = date > new Date() ;
  return formatted;
}

export const SelectClassRoom = (previewID,selectRoom,setPreviewContent)=>{
    if(previewID.tag === 'assignments'){
      const asg = selectRoom.assignments.find((asgn) => asgn._id === previewID.id);
      setPreviewContent(asg);
    }
    else if(previewID.tag === 'announcements'){
      const anc = selectRoom.announcements.find((anc) => anc._id === previewID.id);
      setPreviewContent(anc);
    }
    else if(previewID.tag === 'materials'){
      const mtr = selectRoom.materials.find((mtr) => mtr._id === previewID.id);
      setPreviewContent(mtr);
    }
}

export const setActiveClassRoom = (roomInfo,setSelectRoom, activeRoom,setActiveOption)=>{
  console.log(roomInfo);
    const room = roomInfo?.find((course) => course.roomTitle === activeRoom);
    setSelectRoom(room);
    const payload = {
      dt : room?.department,
      sm : room?.semester,
      cd : room?.courseID
    };
    sessionStorage.setItem("taskInfo",JSON.stringify(payload));
    sessionStorage.setItem("assgcid",(room?.courseID));
    setActiveOption("posts");
    console.log(room);
}

export const getClassRoomInfo = async()=>{
  try {
      const URL = `http://localhost:8080/fetch-classroom`;
      const response = await axios.get(URL,{withCredentials:true});
      return response?.data;
      // sessionStorage.setItem("classRoomInfo",JSON.stringify(response?.data));
      
  } catch (error) {
      console.log(error);
  }
}