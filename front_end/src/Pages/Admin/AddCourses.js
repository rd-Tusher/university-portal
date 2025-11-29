import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { department as dept, semester as sem } from '../../Components/KeyValueObject'
import axios from "axios";
import Select from 'react-select'
function AddCourses() {
  const courseMetaData = [
    {name: "courseName",label: "Course Name",placeholder: "e.g. Software Eng...",type : "text"},
    {name: "courseID", label: "Course ID", placeholder: "e.g. cse3201",type : "text" },
    {name: "courseTeacher",label: "Course Teacher",placeholder: "e.g. Sazzad khan",type : "text"},
  ];
  
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
  setCourseData(prevCourses =>
    prevCourses.map(course => ({
      ...course,
      department: department,
      semester: semester
    }))
  );
}, [department, semester]); 


  const [courseData, setCourseData] = useState([]);

    const handleChange = (key, value, index) => {
      setCourseData((prev) => {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index] || {},
          [key]: value,
        };
        return updated;
      });
    };


 const handleroutines = (courseIndex, key, value, dayIndex) => {
  setCourseData((prev) => {
    const updated = [...prev]; 
    const course = { ...updated[courseIndex] }; 

    const routines = [...course.routines];
    routines[dayIndex] = {
      ...routines[dayIndex],
      [key]: value,
    };

    course.routines = routines;
    updated[courseIndex] = course;

    return updated;
  });
};



  const addNewCourse = ()=>{
    setCourseData([...courseData ,    {department ,semester , courseName: '', courseID: '', courseTeacher: '',routines : [{day : '',start : '',end : '',room : ''}] }
    ]);
  };


  const removeCourse = (index) =>{
      setCourseData((prev) => prev.filter((_,i) => i !== index));
  }


  const showdata = ()=>{
     setJsonData(courseData);
  }

  const addClassSchedule = (index) =>{
    const updated = [...courseData];
    updated[index].routines.push({day : '',start : '',end : '',room : ''});
    setCourseData(updated);
  }

  const removeScheduelBlcok = (index,index1) =>{
    const updated = [...courseData];
    updated[index].routines = updated[index].routines.filter((_,i) => index1 !== i);
    setCourseData(updated);
    
  }

  const handleSubmit = async(e)=>{

    e.preventDefault(); 
    console.log(jsonData);
    const URL = 'http://localhost:8080/save-course-info';
    try {
        const response = await axios.post(URL,
            jsonData,
          {
            headers : {
              'Content-Type' : 'application/json'
            }
          }
        );
        console.log(response);
    } catch(error){
      console.log(error);
    }

  }

  return (
    <>
  <form onSubmit={(e)=>handleSubmit(e)}>
    <div className="admin-card">
      <div className="row">
        <div className="col-12 col-md-6">
          <label className="form-label">Department</label>

          {/* <input
            type="text"  
            className="form-control"  
            placeholder="e.g. cse " 
            value={department} 
            onChange={(e)=>setDepartment(e.target.value)}
            required
          /> */} 
          <Select
            options={dept}
            onChange={(selectedOption)=>setDepartment(selectedOption.value)}
            value={dept.find(s => s.value === department)}
            placeholder="Select department..."
            className='mb-4'
            >
          </Select>
        </div>


        <div className="col-12 col-md-6">
          <label className="form-label">Semester</label>

          {/* <input
            type="text"  
            className="form-control"  
            placeholder="e.g. 5"
            value={semester}
            onChange={(e)=>setSemester(e.target.value)}
            required
          /> */}
          <Select
            options={sem}
            onChange={(selectedOption)=>setSemester(selectedOption.value)}
            value={sem.find(s => s.value === semester)}
            placeholder="Select semester..."
            className='mb-4'
            >
          </Select>
        </div>

        <div className="hr">{" "} <hr />{" "}  </div>
      </div>
      <div className="mb-3">Course List</div>
        <div>
          {Array.isArray(courseData)&&
          courseData.map((course,index)=>(
            <CourseForm
              key={index}
              courseMetaData = {courseMetaData}
              courseData = {course}
              handleChange={(key, value) => handleChange( key, value,index)}
              handleroutines={(key,value,index1) => handleroutines(index,key,value,index1)}
              onRemove={()=>removeCourse(index)}
              courseBlockNumber = {index + 1}
              addClassSchedule = {()=> addClassSchedule(index)}
              removeScheduelBlcok = {(dayIndex)=> removeScheduelBlcok(index,dayIndex)}
              />
          ))}
    </div>

      <div className="d-grid">
        <button type="button" className="btn btn-outline-primary mt-3" onClick={addNewCourse}> + Add New Course  </button>
      </div>
      <div className="hr">  {" "}  <hr /></div>
      <div className="d-grid mt-2">
        <button type="button" className="btn btn-outline-primary p-2" onClick={showdata}>Prepare for Submission</button>
      </div>
    </div>
    <div>
      {jsonData &&
      <div className="admin-json-card mt-3" >
        <div className="mb-3 text-primary fw-bold">
            <h2 >Generated Course Data According to your Submitted Information</h2>
            <small >Review and submit</small>
        </div>
            <pre>{JSON.stringify(jsonData,null,3)}</pre>
            <div className="d-grid">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </div>
        </div>
      }
      </div>

        </form>

    </>
  );
}

export default AddCourses;