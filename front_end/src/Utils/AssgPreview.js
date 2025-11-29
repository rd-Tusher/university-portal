import React, { useEffect, useState } from 'react'
import SubmitAssign from './SubmitAssign';
import { dateFormatter } from './ClassRoomUtils';
import axios from 'axios';
function AssgPreview({roomData}) {

  const [role,setRole] = useState(null);
  const [allSubmission, setAllSubmission] = useState(null);
  const [points, setPoints] = useState(0);
  const [ind , setInd] = useState(0);

  useEffect(()=>{
    const getRole = async ()=>{
      const URL = 'http://localhost:8080/get-role';
      
      const payload = JSON.parse(sessionStorage.getItem("taskInfo"));
      const URL2 = `http://localhost:8080/fetch-student-submit?department=${encodeURIComponent(payload?.dt || "")}&semester=${encodeURIComponent(payload?.sm || "")}&courseID=${encodeURIComponent(payload?.cd || "")}&assgId=${encodeURIComponent(roomData?._id)}`;

      try {
        const response = await axios.get(URL,{withCredentials : true});
        setRole(response?.data);

        const response2 = await axios.get(URL2);
        setAllSubmission(response2?.data);
        console.log(response2?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRole();
  },[roomData?._id]);

  return (
    <>
    <div className='row gap-1 justify-content-evenly'>
        <h1 className='text-primary'>Assingment Review console</h1>
        <div className="col-12 col-md-7 p-2">
          {
            roomData && (
              <div className='box-shadow rounded-3 p-3'>
                <h2 className='mb-0 mt-3 text-primary'>{roomData?.title} </h2>
                <div className='d-flex align-items-center justify-content-cente gap-2 wrap'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-info" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                  </svg>
                  {roomData?.date && (
                    <p className=' mb-0'>Due : {dateFormatter(roomData?.date)}</p>
                  )}
                  {roomData?.points && <p className='mb-0 ms-3'>{roomData?.points} points</p>}
                </div>
                <hr />
                <h4 className='wrap mt-2 text-primary'> Instruction : </h4>
                <div className='  shadow-sm rounded-2 p-2'>
                  {roomData?.description}
                </div>
              </div>
            ) 
          }
          {roomData?.fileUrl && (
            <div className='mt-3 border shadow-sm p-3 rounded-3 bg-white'>
            <h4 className='text-primary'>Attachments : </h4>
            {Array.isArray(roomData?.fileUrl) ? (
              roomData?.fileUrl?.map((url,index) =>(
                <a
                  key={index}
                  className='wrap border border-info p-3 rounded-3 d-block text-decoration-none text-primary'
                  href={url}
                  >{url.split("/").pop()}
                  </a>
              ))
            ) : (
              <p  
              href={roomData?.fileUrl}
              className='wrap border border-info p-3 rounded-3 bg-indigo text-primary'>{roomData?.fileUrl.split("/").pop()}</p>
            )
          }
          </div>
        )}  
        </div>

        <div className="col-12 col-md-4 p-2">

          {role === 'teacher' && (

            <div className=" p-3 box-shadow rounded-3">
            <h2 className='text-center text-primary mt-3'>Student Submission</h2>
            <hr />
            {
              allSubmission && (
                allSubmission?.slice(ind,ind+1).map((student,index)=>(
                  <div className='p-3' key={index}>
                  <p>Student ID : </p>
                  <p className='shadow-sm p-2 rounded-3 bg-indigo text-center fs-4 '>{student?.studentID.toUpperCase()}</p>
                  <p className='fw-500'>Submitted files : </p>
                  {student?.file && (
                    student?.file?.map((f,i)=>(
                <div className='border border-primary rounded-3 p-2 mt-1 d-block bg-indigo  wrap' key={i}>
                  <a href={f} className='text-decoration-none'>{f.split("/").pop()}</a>
              </div>
                    )) 
                  )}
              <div className='d-flex align-items-center justify-content-between'>
                <p className='mt-3 fw-500'>Points :</p>
                <p className='mb-0'>{points} / {roomData?.points} Max</p>
              </div>
              <input id='points' type="Number" value={points} onChange={(e)=>setPoints(e.target.value)} min={0} max={roomData?.points}/>
              </div>
            )))}
              {allSubmission ? (
            <div className='d-flex align-items-center justify-content-evenly mb-3'>
              <button className='btn btn-outline-primary' onClick={()=> setInd(prev => prev > 0 ? prev-1 :  0)}>Prev</button>
              <button className='btn btn-outline-primary'onClick={()=>setInd(prev => prev < (allSubmission.length -1) ? prev + 1 : prev)}>Next</button>
            </div>

              ):(
                <div className='text-center'>No one Submitted yet</div>
              )}

          </div>
          )}

          {role?.includes("student") && (
            <div className='box-shadow rounded-3 p-2 bg-white'>
              <SubmitAssign roomData={roomData}/>
            </div>
          )
           } 
        </div>
      </div>
    </>
  )
}

export default AssgPreview