import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";

function UpdateCtMark() {
  const inputRefs = useRef([]);
  const [studentData, setStudentData] = useState([]);
  const [msg, setMsg] = useState('');
  const [results, setResults] = useState([
    {userID : '',testMark : ''}
  ]);
  const [len, setLen] = useState(1);
  const {department,courseID, testID} = useParams();
console.log(department)
  
  
  const handleChange = (index, id,value) => {
    const updatedValue = [...results];
    updatedValue[index] = {userID : id, testMark : value};
    setResults(updatedValue);
  };


  useEffect(() => {
    const URL = `http://localhost:8080/fetch-all-student-id-name`;

    async function getData() {
      try {
        const response = await axios.get(URL,{withCredentials:true });
        setStudentData(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  




  const handleSubmit = async(e)=>{
    e.preventDefault();
    const URL = "http://localhost:8080/save-test-result";
    try {
      const response = await axios.post(URL,
        {
          courseID : courseID,
          testID : testID,
          results : results
        },
        {
          headers :{
            'Content-Type' : 'application/json'
          },
          withCredentials : true
        }
      );
      console.log(response);
      setMsg(response.data);
    } catch(error){
        setMsg(error.response.data);
    }
  }

  return (
    <div className=" ct-form-len">
      <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <h3 className="d-inline">{"props.data.courseName"} </h3>
        <sub>  {" "} <small className="text-info fw-bold">  {"props.data.ctTitle"}  </small>{" "}  </sub>
      </div>
      <div className="row tb-header mb-2">
        <div className="col-3 col-md-3 text-center">ID</div>
        <div className="col-5 col-md-5 text-center">Name</div>
        <div className="col-4 col-md-4 text-center">Mark</div>
      </div>

       {studentData?.slice(0,len).map((student, index) => (
        <div key={student?.userID} className="row mt-1">
          <div className="col-3 col-md-3 text-center">{student?.userID} <sub >{index+1}</sub> </div>
          <div className="col-5 col-md-5 text-center">{student?.fullname}</div>
          <div className="col-4 col-md-4 text-center">
              <input
                key={student?.userID}
                type="Number"
                min={0}
                max={100}
                className="fm-control text- border border-info"
                value={results[index]?.testMark}
                onChange={(e)=>handleChange(index,student?.userID,e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { 
                    setLen((prev)=> prev+1)
                    e.preventDefault();
                    setTimeout(()=>{
                      inputRefs.current[index+1]?.focus();
                    },0);
                  }
                }}
                ref={(el) => (inputRefs.current[index] = el)}
                placeholder="Enter result..."
                required
              />
          </div>
        </div>
      ))}
      <div className="d-grid mt-3">
        <button className="btn btn-outline-info">Submit Result</button>
      </div>
      {/* {
        msg && (
          <div className="text-light">{msg}</div>
        )
      } */}
      </form>
    </div>
  );
}

export default UpdateCtMark;