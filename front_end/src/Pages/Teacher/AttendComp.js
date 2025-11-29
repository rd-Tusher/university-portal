import { useEffect,useState } from "react";

export default function AttendComp({
  name,
  studentID,
  present,
  absent,
  onPress,
  courseID,
  courseName,
  totalClass,
  index,
  handleClick
}) {
  const [pressedKey, setPressedKey] = useState(null);
  const [activeA,setActiveA] = useState(false);
  const [activeP,setActiveP] = useState(false);


useEffect(() => {

  const handleKeyDown = (event) => {
    if (event.key === 'p' || event.key === 'a') {
      if (event.key === 'p') {
        setActiveP(true);
      } else {
        setActiveA(true);
      }
      setPressedKey(event.key);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'p' || event.key === 'a') {
      if (event.key === 'p') {
        setActiveP(false);
      } else {
        setActiveA(false);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp); 
  };
}, []);


  useEffect(()=>{

    if(!pressedKey) return;
    
    if(pressedKey === 'p'){
      handleClick(studentID,courseID,present + 1,absent,'p');
    } else if(pressedKey === 'a') {
      handleClick(studentID,courseID,present,absent+1,'a');
    }

    setTimeout(() => {
      onPress();
    }, 100);

    setPressedKey(null);
  },[pressedKey]);
 
  
  return (

      <div key={index} className="row mt-5 fw-bold" >
        <div className="col-12 col-md-6 col-lg-4 border border-info rounded-3 p-3 m-auto text-start">

          <h1 className='text-info'>Student Attendence Snapshot</h1>
            <hr className="text-info" />
          <div className='text-info mt-4 p-2'>
            <div className='d-flex justify-content-between'>
              <p className='mb-0'>Student Name : </p>
              <p className='mb-0'>{name} </p>
            </div>

            <div className='d-flex justify-content-between'>
              <p className='mb-0'>Student ID : </p>
              <p className='mb-0'>{studentID?.toUpperCase()} </p>
            </div>
          </div>

          <div className='text-info mt-2 mb-2 p-2'> 
            <div className='d-flex justify-content-between'>
              <p className='mb-0'>Course Name : </p>
              <p className='mb-0 fs-'>{courseName} </p>
            </div>

            <div className='d-flex justify-content-between'>
              <p className='mb-0'>Course ID : </p>
              <p className='mb-0'>{courseID} </p>
            </div> 
          </div>
            <hr className="text-info" />



            <p className='text-info fw-bold fs-5'>Current Attendence Matrices</p>
          <div className="row gap-3 text-info justify-content-center ">
            <div className="col-5 border border-info text-center p-2 rounded-3 ">
              <p className='fw-bolder mb-0'>TOTAL CLASSES</p>
              <p className="fs-9">(Inc. today)</p>
              <p className='fw-bolder fs-1'>{Number(totalClass) + 1}</p>
            </div> 

            <div className="col-5 border border-info rounded-3 text-center p-2 ">
              <p className='fw-bolder'>PRESENT</p>
              <p className='fw-bolder fs-1'>{present}</p>
            </div>

            <div className="col-5 border border-info text-center  rounded-3 p-2 ">
              <p className='fw-bolder text-danger mb-'>ABSENT  </p>
              <p className='fw-bolder fs-1 text-danger'>{absent}</p>
            </div>

            <div className="col-5 border border-info rounded-3">
              <svg
                viewBox='0 0 36 26'
              >
                <circle  cx="18"  cy="13"  r='8'  fill='none'  stroke='#e9ecef'  strokeWidth='1.5' />
                <circle  cx="18"  cy="13"  r='8'  fill='none'  stroke='#4097edff'  strokeWidth='1.5' 
                  strokeLinecap='round'
                  strokeDasharray='50'
                  strokeDashoffset={'10'}
                  transform='rotate(-90 18 13)'
                />
              </svg>
              <div></div> 
            </div>
          </div>
            <hr className="text-info" />

            <div>
              <p className='text-info fw-bold fs-5 mt-3'>Mark Attendence Today</p>
              <div className="d-grid mb-3">
                <div className={`btn btn-outline-info fw-bold ${activeP ? "active-btn" : ""}`} onClick={onPress}>Present (P)</div>
              </div>
              <div className="d-grid">
                <div className={`btn btn-outline-info fw-bold ${activeA ? "active-btn" : ""}`} onClick={onPress}>Absent (A)</div>
              </div>
            </div>
        </div>
      </div>
  ) 
} 
    