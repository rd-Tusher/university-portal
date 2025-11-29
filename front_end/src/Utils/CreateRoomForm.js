import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';
import { fetchCourse } from './ClassRoomUtils';


function CreateRoomForm() {
    const [tCourse,setTCourse] = useState([]);
    const [roomInfo,setRoomInfo] = useState({
        courseID : '',
        roomTitle : '',
    })


useEffect(() => {
  const loadCourses = async () => {
    let sCourse = JSON.parse(sessionStorage.getItem("tCourse"));

    if (!sCourse) {
      await fetchCourse();
      sCourse = JSON.parse(sessionStorage.getItem("tCourse"));
    }

    if (sCourse) {
      setTCourse(sCourse);
    }
  };

  loadCourses();
}, []);

 


  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(roomInfo);

    const url = 'http://localhost:8080/create-class-room';

    try {
      const res = await axios.post(url,roomInfo,{
        withCredentials:true,
        headers : {
          'content-type' : "application/json"
      }
    }
    );
    console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
        <div> 
          <Select 
            options={tCourse?.length > 0 ? tCourse : []} 
            onChange={(selectedOption)=>setRoomInfo(prev =>({ ...prev, courseID : selectedOption.value}))}
            value={tCourse?.find(c => c.courseID === roomInfo.courseID)}
            required
            // placeholder="Select course..."
            placeholder={
              tCourse?.length > 0 ? "Select course" : (
                <div className="n-to-show"> <div class="three-dots"><span></span><span></span><span></span> </div> </div>
              )
            }
            >

            </Select>

          <input type="text" 
            className="form-control mt-3"
            placeholder="Room title"
            onChange={(e)=>setRoomInfo(prev =>({ ...prev, roomTitle : e.target.value}))}
            required
          />
          <button className="btn btn-outline-primary mt-3" onClick={(e)=> handleSubmit(e)}>Create</button>
        </div>
  ) 
}

export default CreateRoomForm;