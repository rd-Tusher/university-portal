
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Select from 'react-select'
import axios from "axios";


export function StudentProtectedRoute(){
    const token = localStorage.getItem('accessToken');
    if(!token){
          return <Navigate to="/" />
    }
    
    return (
    <>
      <Navbar/>
      <Outlet/>
    </>
    );
}

 

export function CtMarkPreCheck() {
  const [course, setCourse] = useState("");
  const [available, setAvailable] = useState(null);
  const [ctInfo, setCtInfo] = useState(null);
  const [selectedTest, setSelectedTest] = useState([]);
  const [ctDetails, setCtDetails] = useState(null);
  const navigate = useNavigate();

  const courseInfo = JSON.parse(localStorage.getItem("courseInfo"));


  const courseOptions = courseInfo.map(course =>({
    value : course.courseID,
    label : course.courseName
  }));

  useEffect(()=>{
    const department = localStorage.getItem("department");
    const semester = localStorage.getItem("semester");
    const fetchScheduledCt = async ()=>{
    const URL = `http://localhost:8080/fetch-test-info?department=${department}&semester=${semester}&courseID=${course.value}`;
    try{
      const response = await axios.get(URL);
      setAvailable(true);
      setCtInfo(response?.data);
      console.log(response.data);

    } catch(e){
      setAvailable(false);
    }
    }
    course && fetchScheduledCt();
  },[course]);

  const handleChange =(s)=>{
    setCourse(s);
  }

  const handleSelect = (courseID,testNo,i)=>{
    setSelectedTest((prev)=>{
      if(prev.includes(i)){
        return prev.filter((t) => t !== i);
      }
      else {
        return [...prev,i]
      }
    });
    if(ctDetails === null){
      setCtDetails({courseID : courseID,testNo: testNo});
    }
    else {
      setCtDetails(null);
    }
  }

  const handleProceed = ()=>{
    navigate("/update-ct-mark",{
      state : {
        department : ctDetails.department,
        semester : ctDetails.semester,
        courseID : ctDetails.courseID,
        testNo : ctDetails.testNo
      },
    });
  }



  return (
    <div className="ct-form-len "> 
      <div className="row f-flex justify-content-center">
        <div className="col-12 mid-col-4">
          <h2 className="text-white mb-3">Select course to see scheduled test</h2>
            <Select
              id="courseSelect"
              options={courseOptions}
              onChange={(selectedOption)=>handleChange(selectedOption)}
              value={course}
              placeholder="Select a course..." 
              >
            </Select>
        </div>

          {
            available === false ? (
              <div className="text-light mt-1">No scheduled test found</div>
            ) : (
              ctInfo?.map((course, index) => (
                <div key={index} className="text-light mt-3">
                  {course.schedule?.map((schedule, i) => (
                    <div key={i} className="border border-info rounded-3 p-1 pointer" onClick={()=>handleSelect(course.courseID,schedule.testNo,i)}>
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <div>Test Id : {course.courseName.toUpperCase()}-{schedule.testNo}</div>
                          <div >Test date : {schedule.testDate}</div>
                          <div>Test type : {schedule.testType}</div>
                        </div>
                        <i id={i} className={`bi ${selectedTest.includes(i) ? 'bi-check-circle-fill' : 'bi-circle'} text-info`}></i>
                      </div>
                    </div>
                  ))}
                      <div className="d-grid">
                      <button disabled={ctDetails === null} className="btn btn-outline-primary mt-3" onClick={handleProceed} >Proceed</button>
                      </div>
                </div>
              ))
            )
          }
      </div> 
    </div>
  );
}