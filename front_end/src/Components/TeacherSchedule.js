import React, { useEffect, useState } from 'react'
import { getCourse } from '../Utils/teacherUtils';
import { departmentMap } from './KeyValueObject';
import { useAppData } from '../Utils/CreateContext';
import axios from 'axios';

function TeacherSchedule() {
  const [deptSem, setDeptSem] = useState(null);
  const [teacherCourse, setTeacherCourse] = useState(null);
  const {setShowHam} = useAppData();
  const [showForm , setShowForm] = useState(false);
  const [scsMsg, setScsMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [status, setStatus] = useState(null);
  const [delayCrsInfo, setDelayCrsInfo] = useState({
    courseID : '',
    time : ''
  }); 
  
  

useEffect(()=>{
  const fetch = async()=>{
    await getCourse();
    const data1 = JSON.parse(sessionStorage.getItem("dept-sem"));
    const data2 = JSON.parse(sessionStorage.getItem("teacher-course"));
    setDeptSem(data1);
    setTeacherCourse(data2);
  }

  fetch();
  setShowHam(false);
 
},[]);
 

useEffect(()=>{
  if(showForm === false){
    setScsMsg("");
    setErrMsg("");
  }
  if(status === 200){
    setTimeout(() => {
      setShowForm(prev => !prev);
      setStatus(null);
    }, 1000);
  }
},[showForm,status]);

const handleDelay = async(e)=>{
  e.preventDefault();
  console.log(delayCrsInfo);
  try {
    const URL = 'http://localhost:8080/delay-class';
    const response = await axios.post(URL,
      delayCrsInfo,
      {
      headers : {
        'Content-Type' : "application/json"
      }
    });
    console.log(response.status);
    setStatus(response?.status);
    setScsMsg(response?.data);
  } catch (error) {
    console.log(error.response.data);
    setErrMsg(error?.response?.data);
  }
}

const handleCancel = async(courseID)=>{
  console.log(courseID);
  const URL = `http://localhost:8080/cancel-class?courseID=${courseID}`;
  try {
    const response = await axios.get(URL,{
      headers : {
        'Content-Type' : "application/json"
      }
    })
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}

  return (
    <div className='mt-3'>
        <div className="  mt-3">
            <div className="d-flex align-items-center">
            <h1 className='text-primary ms-3'>Your Today's Class Schedule</h1>
          </div>

      {deptSem && deptSem.map((ds, index) => (
              <div key={index} className='ms-3 mt-3 row'>

                <h3 className=''>
                  {departmentMap[ds?.dept] + " - " + ds?.sem}
                </h3>

                {teacherCourse && teacherCourse
                  .filter(c => c?.department === ds?.dept && c?.semester === ds?.sem) 
                  .map((c, i) => (
                    <div key={i} className='col-6 col-md-4 col-lg-3 box-shadow p-3 rounded-3 ms-3 mb-3 pos-rel border'>

                      <p className='mb-1'>Course Name : {c?.courseName}</p>
                      <p className='mb-1'>Total taken Class : {c?.totalTakenClass}</p>
                      <p className='mb-1'>CourseID : {c?.courseID?.toUpperCase()}</p>

                      <p className='mb-1'>Starts at : {" "} 
                        {c?.routines?.[0]?.start 
                        ? c?.routines[0].start.split(":")[0] + " : " + c?.routines[0].start.split(":")[1]
                        : "No routine"}
                      </p>

                        <div className='d-flex align-items-center justify-content-evenly mb-3'>
                          <button className='btn btn-outline-primary'onClick={()=>{ setDelayCrsInfo({...delayCrsInfo, courseID : c?.courseID}); setShowForm(prev => !prev)}} >Delay</button>
                          <button className='btn btn-outline-primary'onClick={()=>handleCancel(c?.courseID)}>Cancel</button>
                        </div>
 
                    </div>
                  ))}
              </div>
            ))}
            {/* pop up form  */}
            <div className={`overlay ${showForm ? "visible" : ""}`} onClick={()=> setShowForm(prev => !prev)}></div> 
            <div className={`float-form ${showForm ? "active" : ""}`}>
              <div className='p-3'>
                <h2 className='text-primary mb-3'>Time delation form</h2>
                <form onSubmit={(e)=> handleDelay(e)}>
                  <label htmlFor="" className='form-label'>Delay class time for</label>
                  <input type="text" className='form-control mb-2' disabled value={delayCrsInfo?.courseID?.toUpperCase()}/>
                  <label htmlFor="newtime" className='form-label'>Time</label>
                  <input type="time" className='form-control' onChange={(e)=> setDelayCrsInfo({...delayCrsInfo, time : e.target.value})} value={delayCrsInfo.time} required/>
                  <div className="d-flex justify-content-evenly">
                  <button className='btn btn-light mt-3 ' >Submit</button>
                  <button className='btn btn-light mt-3 ' onClick={()=>setShowForm(prev => !prev)}>Cancel</button>
                  </div>
                </form>
              </div>
              {
                scsMsg && (
                  <div className='text-success fs-5 text-center mb-1'>{scsMsg}</div>
                )
              }
              {
                errMsg && (
                  <div className='text-danger fs-5 text-center mb-1'>{errMsg}</div>
                )
              }
            </div>

        </div> 

        <div className="row ms-3">
          <h2 className='text-primary mb-2'>Upcoming Test Schedule</h2>
          <div className="col-6 col-lg-5 border p-2 rounded-3 bg-white box-shadow ms-3">

          </div>
        </div>
    </div>
  ) 
}

export default TeacherSchedule;