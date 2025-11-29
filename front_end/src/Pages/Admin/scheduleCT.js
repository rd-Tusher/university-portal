import React,{ useEffect, useState} from 'react'
import { handleSubmit } from '../adminInputValidation';
import Select from 'react-select'
import axios from 'axios';
function ScheduleCT() {

  const [crsInfo, setCrsInfo] = useState();

  const [ctInfo, setCtInfo] = useState({
    courseID : '',
    courseName : '',
    testDate : '',
    testID : '',
    testMark : '',
    testType : ''
  });


  useEffect(()=>{
    const fetchCourse = async()=>{
      try {
        const URL = 'http://localhost:8080/get-course-name&id';
        const response = await axios.get(URL,{withCredentials:true});
        console.log(response.data);
        const data = response?.data?.map(c => ({
          label: c.courseName,
          value: c.courseID
        }));

        setCrsInfo(data);
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchCourse();
  },[]);


  


const testType = [
  { label: "Class Test", value: "Class Test" },
  { label: "Lab Test", value: "Lab Test" }
];


  const handleChange = (e)=>{
    const {name, value} = e.target;

    setCtInfo(prev=>({
      ...prev,
      [name] : value
    }));

  }
  


  return (
    <>
    <header className='ct-form-len'>
      <h1>Academic Test Schedule</h1>
      <div>Organize and visualize your upcoming exams and deadlines.</div>
    <hr />
    </header>
    <div className='ct-form-len crd' style={{marginTop : "-50px"}}>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-mid-4">
            <h4 className='fw-bold'>Add New Test</h4>
            <hr />
            <form onSubmit={(e)=>handleSubmit(e,ctInfo)}>

              <label htmlFor="courseSelect" className='form-label'>Select Course</label>
              <Select
                id="courseSelect"
                options={crsInfo}
                onChange={(selectedOption)=>setCtInfo(prev =>({...prev, courseID : selectedOption.value, courseName : selectedOption.label}))}
                value={crsInfo?.find(option => option.value === ctInfo.courseID) || null}
                placeholder="Select a course..."
                >
              </Select>

              <label htmlFor="courseSelect" className='form-label mt-3'>Test Type</label>
              <Select
                id="courseSelect"
                options={testType}
                onChange={(selectedOption)=>setCtInfo(prev =>({...prev, testType : selectedOption.value}))}
                value={testType.find(option => option.value === ctInfo.testType) || null}
                placeholder="Select type..."
                >
              </Select>

              <label htmlFor="" className='form-label mt-3'>Date of Test </label>
              <input name='testDate' type="Date" className='form-control' onChange={handleChange} value={ctInfo.testDate} required/>

              <label htmlFor="" className='form-label mt-3'>Test ID</label>
              <input name='testID' type="number" className='form-control' min={1} max={30} onChange={handleChange} value={ctInfo.testID} required placeholder='e.g. 01'/>



              <label htmlFor="" className='form-label mt-3'>Test Marks</label>
              <input name='testMark' type="number" className='form-control' min={0} onChange={handleChange} value={ctInfo.testMark} required placeholder='e.g. 30'/>

              <div className='d-grid mt-3'>
                <button disabled = {Object.values(ctInfo).every(value => value === '')} type='submit'  className='btn btn-outline-primary'>Schedule</button>
              </div>
              <div id='error'></div>
            </form>
        </div>

      </div>

    </div>
    </>
  )
}

export default ScheduleCT;