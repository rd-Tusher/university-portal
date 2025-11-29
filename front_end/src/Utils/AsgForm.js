import Select from 'react-select'
import { fetchCourse } from './ClassRoomUtils';
import { useEffect, useState } from 'react';
import axios from 'axios';
function AsgForm() {

  const [tCourse, setTCourse] = useState([]);
  const [asgnInfo, setAsgnInfo] = useState({
    courseID : "",
    title : "",
    description : "",
    points : "",
    date : "",
    file : null
  });





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


const handleAssingSubmit = async(e)=>{
    e.preventDefault();

    console.log(asgnInfo);

    const formData = new FormData();
    formData.append("courseID",asgnInfo.courseID);
    formData.append("title",asgnInfo.title);
    formData.append("description",asgnInfo.description);
    formData.append("date",asgnInfo.date);
    formData.append("points",asgnInfo.points);
    formData.append("file",asgnInfo.file);
    const URL = `http://localhost:8080/save-assignment`;
    try{
        const response = await axios.post(URL,formData,{
        headers : {
            'Content-Type' : "multipart/form-data"
        }
        } );
        console.log(response);
    } catch(err){
        console.log(err);
    }
}


  return (
    <div>
          <Select
            options={tCourse}
            onChange={(selectedOption)=>setAsgnInfo({...asgnInfo,courseID : selectedOption.value})}
            placeholder={
              tCourse?.length > 0 ? "Select course..." : (
                <div className="n-to-show"> <div class="three-dots"><span></span><span></span><span></span> </div> </div>
              )
            }
          >

          </Select>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Assignment Title..."
            onChange={(e)=> setAsgnInfo({...asgnInfo, title : e.target.value})}
            value={asgnInfo.title}
            required
          />

          <textarea
            type="text"
            className="form-control mt-3"
            style={{resize : "none"}}
            placeholder="Instructions for students..."
            onChange={(e)=> setAsgnInfo({...asgnInfo, description : e.target.value})}
            value={asgnInfo.description}
          />

          <label htmlFor="" className='form-label mt-3'>Deadline</label>
          <input
            type="Date"
            className="form-control "
            onChange={(e)=> setAsgnInfo({...asgnInfo, date : e.target.value})}
            value={asgnInfo.date}
          />

          <input
            type="Number"
            min={0}
            className="form-control mt-3"
            placeholder="Class work point..."
            onChange={(e)=> setAsgnInfo({...asgnInfo, points : e.target.value})}
            value={asgnInfo.points}
          />

          <input
            type="file"
            className="form-control mt-3"
            placeholder="Attach realated files or documetns..."
            onChange={(e)=> setAsgnInfo({...asgnInfo, file : e.target.files[0]})}
          />
          <button className="btn btn-outline-primary mt-3 " onClick={(e)=>handleAssingSubmit(e)}>Submit</button>
        </div>
  )
}

export default AsgForm;