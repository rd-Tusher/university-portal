import { useEffect, useState } from "react";
import AddNew from "../../Components/AddNew";
import { useNavigate } from "react-router-dom";
import Posts from "../../Components/Posts";
import Preview from "../../Components/Preview";
import { getClassRoomInfo, SelectClassRoom, setActiveClassRoom } from "../../Utils/ClassRoomUtils";
import { useAppData } from "../../Utils/CreateContext";

function ClassRoomMain() {
  const [activeOption, setActiveOption] = useState("");
  const {activeRoom, setActiveRoom,setShowHam, showHam} = useAppData();
  const [postType, setPostType] = useState("");
  const [showPost,setShowPost] = useState(true);
  const [selectRoom, setSelectRoom] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [previewID , setPreviewID] = useState({  tag : "",  id : ""});
  const navigate = useNavigate();
 
  useEffect(()=>{
    SelectClassRoom(previewID,selectRoom,setPreviewContent);
   setActiveOption("preview");
  },[previewID]);

const [roomInfo, setRoomInfo] = useState(null);

useEffect(() => {

  const fetchRoomInfo = async () => {
    const data = await getClassRoomInfo();
    setRoomInfo(data);
  };

  fetchRoomInfo();
}, []);


 
  useEffect(()=>{
    setShowHam(false);
    setShowPost(true);
    setPostType("");
    console.log(activeOption);
      // window.history.pushState({}, "", `/teacher/classroom/show?tab=${activeOption}`);
      // navigate(`/teacher/classroom/show?tab=${activeOption}`);

  },[activeRoom,activeOption]);

  useEffect(() => {
  if (!roomInfo || !activeRoom) return; 

  setActiveClassRoom(roomInfo, setSelectRoom, activeRoom, setActiveOption);

}, [roomInfo, activeRoom]);


  
   const options = [
    { key: "posts", label: "Posts" },
    { key: "discussion", label: "Discussion" },
    { key: "add new", label: "New", icon: "bi bi-plus" },
    { key: "preview", label: "Preview" },
  ];

  return (
    <div className="min-vh-100">
    <div className="row room-content justify-content-center align-items-center">
        <div className="mh-90">
            <div className="row align-items-center justify-content-start">
             {options.map(opt => (
            <div key={opt.key} className="col-md-2 col-3">
              <div
                className={`option ${activeOption === opt.key ? "active text-primary" : ""}`}
                onClick={() => {setActiveOption(opt.key)}}
              >
                {opt.icon && <i className={opt.icon}></i>} {opt.label}
              </div>
            </div>
          ))}
          </div>
            {activeOption === "posts" && (
              <Posts classRoom={selectRoom} setPreviewID={setPreviewID}/>
            )}
          {activeOption === "add new" && (
            <div className="row justify-content-center  mt-3">
              <AddNew postType={postType}  setPostType={setPostType}  showPost={showPost}/>
            </div>
          )}
          {activeOption === "preview" && (
            <div className="row justify-content-center align-items-center p-2">
              <Preview roomData={previewContent} cntType={previewID.tag}/>
          </div>
          )}
        </div>
    </div>
  </div>
  );
}

export default ClassRoomMain; 