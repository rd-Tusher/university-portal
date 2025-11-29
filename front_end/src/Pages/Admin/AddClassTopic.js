import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select'

function AddClassTopic() {
  // const [classStatus, setclassStatus] = useState("");
  const [courseID, setcourseID] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);


  // const [showSubBtn,setShowSubBtn] = useState(false);
  const inputRef = useRef(null);
 
  const department = localStorage.getItem("department");
  const semester = localStorage.getItem("semester");
  

  const courseInfo = JSON.parse(localStorage.getItem("courseInfo"));
  const courses = courseInfo?.map(course=>({
    label : course.courseName,
    value : course.courseID
  }));

  useEffect(() => {
    if (courseID && inputRef.current) {
      inputRef.current.focus();
    } 
    // if(classStatus === "canceled"){
    //   // setShowSubBtn((prev) => !prev);
    //   setTopics([]);
    // }
  }, [courseID]);
  
  useEffect(()=>{
    setTopics("");
  },[courseID])


  const AddTopic = (e,index)=>{
    e.preventDefault();

    setTopics((prev)=>[...prev,topic]);
    setTopic("");
    inputRef.current.focus();
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const URL = 'http://localhost:8080/save-lecture-topics';
    try {
      const response = await axios.post(URL,
        {
          department : department,
          semester : semester,
          topicCourses : [
            {
              courseID : courseDetails.courseID,
              courseName : courseDetails.courseName,
              topics : [
                {
                  topicList : topics
                }
              ]
            }
          ]
        },
        {
          headers : {
            "Content-Type" : "application/json"
          }
        }
      );
      console.log(response);
    } catch(err){
      console.log(err);
    }

    
  }

  // const clStatus = [
  //   {label : "Taken", value : "taken"},
  //   {label : "Canceled", value : "canceled"}
  // ];


  const removeTopic = (index)=>{
    setTopics((prev)=>prev.filter((_,i) => i !== index))
  }
 

  const handleChange = async (selectedOption) =>{
    setcourseID(selectedOption.value);
    const sc = await courseInfo.find(c => c.courseID === selectedOption.value);
    setCourseDetails(sc);
  }



  return (
    <>
    <div className="admin-card">
      <form >
        {/* <div className="mt-3 mb-3">
          <label >Class Compleition Status  </label>
          <Select
          placeholder="Class taken or not..."
          options={clStatus}
          onChange={(selectedOption)=>setclassStatus(selectedOption.value)}
          value={clStatus.find(status => status.value === classStatus) || null }
          >

          </Select>
        </div> */}
        {/* {courses && (classStatus === "taken") && ( */}
          < >
            <div className="mb-3">
              <label htmlFor="courseSelector" className="form-label">  Select Course</label>
              <Select
                name="Option"
                id="courseSelector"
                options={courses}
                onChange={(selectedOption)=>handleChange(selectedOption)}
                value={courses?.find(c => c.value === courseID ) || null}
                placeholder="Select Course..."
              >
              </Select>
            </div> 

            {courseID && (
              <>
                <div className="hr">  <hr />  </div>
                <div> Selected Course : {courseDetails.courseName || "None"}</div>
                <div> Course Teacher : {courseDetails.courseTeacher}</div>
                <div>CourseID : {courseDetails.courseID?.toUpperCase()} </div>


                <div className="mt-4">Lecture No. :  9</div>
                <div>Day: {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]}</div>
     
                <div className="hr">  <hr /></div>


                
                <div>
                  <small>Add today's lecture topic : </small>
                  <div className="d-flex mt-2">
                    <input type="text" className="form-control" placeholder="e.g. Layered architecture..."
                     onChange={(e)=>setTopic(e.target.value)}
                     value={topic}
                     onKeyDown={(e)=>{
                      if(e.key === "Enter"){
                        AddTopic(e);
                      }
                    }}
                    ref = {inputRef}
                    />
                    </div>
                    {
                      topics.length > 0 &&(
                        <div className="mt-4">
                        <div className="fw">Added Class Topic : </div>
                        {
                          topics.map((topic,i) =>(
                            <div key={i} className="d-flex  justify-content-between align-items-center">
                              <div  className="text-dark mt-1 rounded-3 p-2 fw-light" >{i + 1}. {topic}</div>
                              <div className="pointer" onClick={()=>removeTopic(i)}>&times;</div>
                            </div>
                          ))
                        }
                        <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-outline-primary" onClick={(e)=>handleSubmit(e)}>  Submit</button>
                        </div>
                      </div>
                      )
                    }
                </div>
                </>
            )}
          </>
        {/* )} */}
      </form>
      {/* {
        showSubBtn &&(
        <div className="d-grid">  <button type="submit" className="btn btn-outline-primary" onClick={(e)=>handleSubmit(e)}>Submit</button></div>
          )
      } */}
    </div>
      </>
  );
}

export default AddClassTopic;