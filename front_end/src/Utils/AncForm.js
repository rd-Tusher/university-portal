import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { fetchCourse } from './ClassRoomUtils';
import axios from 'axios';
function AncForm() {

  const [files,setFiles] = useState([]);
  const [courses, setCourses] = useState(null);
  const [formData, setFormData] = useState({
    courseID : '',
    title : '',
    description : '',
    date : '',
    files : []
  })


  useEffect(() => {
    const loadCourses = async () => {
      let sCourse = JSON.parse(sessionStorage.getItem("tCourse"));
  
      if (!sCourse) {
        await fetchCourse();
        sCourse = JSON.parse(sessionStorage.getItem("tCourse"));
      }
  
      if (sCourse) {
        setCourses(sCourse);
      }
    };
  
    loadCourses();
  }, []);

  const handleIncrease = ()=>{
    setFiles([...files,null])
  }
  
  const handleFileChange = (file,index)=>{

    const update = [...files];
    update[index] = file;
    setFiles(update);
  }

  const handleClick = (index)=>{
    setFiles((prev)=>prev.filter((_,i) => i !== index));
  }
  const hanldeSubmit = async(e)=>{
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("courseID",formData.courseID);
    formdata.append("title",formData.title);
    formdata.append("description",formData.description);
    formdata.append("date",formData.date);
    files.forEach(file => {
      if (file) formdata.append('files', file);
    });
    const URL = 'http://localhost:8080/save-announcement';
    try {
      const response = await axios.post(URL,formdata,{
        headers : {
            'Content-Type' : "multipart/form-data"
        }
      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>

        <Select
          options={courses}
          onChange={(selectedOption)=>setFormData({...formData, courseID : selectedOption.value})}
          value={courses?.find(c => c.courseID === formData.courseID)}
        >
        </Select>
        
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Announcement Title..."
          onChange={(e)=> setFormData({...formData, title : e.target.value})}
          value={formData.title}
          required
        />

        <textarea
          type="text"
          className="form-control mt-3"
          style={{resize : 'none'}}
          placeholder="Write your announcement here..."
          onChange={(e)=> setFormData({...formData, description :  e.target.value})}
          value={formData.description}
          required
        />

        <input
          type="date"
          className="form-control mt-3"
          placeholder="Write your announcement here..."
          onChange={(e)=> setFormData({...formData, date : e.target.value})}
          value={formData.date}
        />
 
      {
        files.map((file,index)=>(
          <div key={index} className='d-flex align-items-center justify-content-center gap-3 mt-3'>
            <input
              type="file"
              className="form-control"
              onChange={(e)=>handleFileChange(e.target.files[0],index)}
            />
            <p className='mb-0 pointer' onClick={()=>handleClick(index)}>&times;</p>
          </div>

          ))
        }
        <div className='button' onClick={()=>handleIncrease()}>Add File</div>
        <div className=" button" onClick={(e)=>hanldeSubmit(e)}>Submit</div>

    </div>
  )
}

export default AncForm