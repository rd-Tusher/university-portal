import React, { useEffect, useState } from 'react'
import { fetchCourse } from './ClassRoomUtils';
import Select from 'react-select'
import axios from 'axios';
function MtlForm() {
  const [courses, setCourses] = useState(null);
  const [mtlInfo, setMtlInfo] = useState({
    courseID : '',
    title : '',
    description : '',
    files : []
  });


  useEffect( ()=>{
    const fetchDate = async()=>{
      let courses = JSON.parse(sessionStorage.getItem("tCourse"));
      if(!courses){
        await fetchCourse();
        courses = JSON.parse(sessionStorage.getItem("tCourse"));
      }
      if(courses){
        setCourses(courses);
      }
    }
    fetchDate();
  },[]);

  const handleIncrease = ()=>{
    setMtlInfo(prev =>({
      ...prev,
      files : [...prev.files,null]
    }));
  }

  const handleRemove = (index)=>{
    const updateFiles = mtlInfo.files.filter((_,i)=> i!==index);
    setMtlInfo(prev =>({
      ...prev,
      files : updateFiles
    }));
  }

  const handleFileChange = (file,index)=>{
    setMtlInfo(prev=>({
      ...prev,
      files : prev.files.map((f,i)=>i === index ? file : f)
    }));
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formdata = new FormData;
    formdata.append("courseID",mtlInfo.courseID);
    formdata.append("title",mtlInfo.title);
    formdata.append("description",mtlInfo.description);
    // formdata.append("files",mtlInfo.files);
    mtlInfo.files.map((file)=>{
      formdata.append("files",file);
    })
    const URL = 'http://localhost:8080/save-materials';
    try {
      const response = await axios.post(URL,formdata,{
        headers : {
          'Content-Type' : "multipart/form-data"
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  } 
  return (
    <div>

        <Select
          options={courses || []}
          onChange={(selectedOption)=>setMtlInfo({...mtlInfo,courseID : selectedOption.value})}
          value={courses?.find(c => c.courseID === mtlInfo.courseID)}
          placeholder="Select course..."
        >
        </Select>
        <input 
          type="text"
          className="form-control mt-3"
          placeholder="Material Title..."
          onChange={(e)=>setMtlInfo({...mtlInfo, title : e.target.value})}
          value={mtlInfo?.title}
          required
        />

        <textarea
          type="text"
          className="form-control mt-3"
          style={{resize : "none"}}
          placeholder="Short descriptions or notes ..."
          onChange={(e)=>setMtlInfo({...mtlInfo, description : e.target.value})}
          value={mtlInfo?.description}
          required
        />

      {
        mtlInfo?.files?.map((file,index)=>(
          <div key={index} className='d-flex align-items-center justify-content-center gap-3 mt-3'>
            <input
              type="file"
              className="form-control"
              onChange={(e)=>handleFileChange(e.target.files[0],index)}
            />
            <p className='mb-0 pointer' onClick={()=>handleRemove(index)}>&times;</p>
          </div>

          ))
        }
          <div className='button' onClick={()=>handleIncrease()}>Add File</div>

        <div className="button mt-3" onClick={handleSubmit}>Submit</div>
    </div>
  )
}

export default MtlForm 