import { useEffect, useState } from "react";
import { BookOpen,Clock, Tags, ChevronRight,File,CircleCheck } from "lucide-react";
import {
  sortCourse,
  Upcoming,
  Completed,
  Ongoing,
  allCourse,
  showTest,
  classOccured,
  renderCourse,
  getCourseStatus
} from "../Utils/DashboardUtils";
import axios from "axios";
import { subjectMap } from "./KeyValueObject";

function TodaysSchedule() {
  const [upcoming, setupcoming] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]);
  const [testInfo, setTestInfo] = useState(null);
  const [test, setTest] = useState(null);

  useEffect(() => {

    const fetchTest = async()=>{
      try {
        const URL = 'http://localhost:8080/fetch-test-info';
        const URL2 = 'http://localhost:8080/fetch-today-course';
        const [testRes,classRes] = await Promise.allSettled([
           axios.get(URL, {withCredentials : true}),
           axios.get(URL2, {withCredentials : true}),
        ]);

        if(testRes?.value?.status === 200){
          setTestInfo(testRes?.value?.data);
        }
        if(classRes?.value?.status === 200){
          const data = await sortCourse(classRes?.value?.data);
          setCourseInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTest();

  }, []);

  return (
    <>
      <h1 className="card-header-vibrant text-primary text-center  pos-fixed">
        <i className="p-3 bi bi-mortarboard-fill text-primary"></i>
        Academic Session Schedule
      </h1>


      {/* todays class */}
      <div>
        <h2 className="ms-2 m-4 text-primary">Today's Class</h2>
        <div  className="crd-len-2">
        <div className="row p-3 justify-content-start align-items-stretch">
          {!courseInfo || courseInfo?.length === 0 ? (
            <h4 key={"nothing-to-do"} className="text-center fw-bold text-primary mb-5">  No more classes today!</h4>
          ) : (
            courseInfo.map((course, index) => (
                <div key={index} className="col-12 col-lg-4 mb-3">
                  <div className="crd-2 p-0 h-100 border rounded-3 overflow-hidden">

                      {/* Header */}
                      <div className="row m-0 p-3 justify-content-between align-items-center bg-info text-white rounded-top">
                        <h2 className="col-12 mb-0 d-flex align-items-center">
                            <BookOpen size={30}/> &nbsp;  {course.courseName} -{" "} {course.courseID.toUpperCase()}
                        </h2>
                      </div>

                      {/* Body */}
                      <div className="row align-items-center justify-content-evenly p-3">

                      <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                          <i className="bi bi-person-video3 text-primary"></i>
                          <div>
                          <p className="mb-0">Course Teacher</p>
                          <p className="mb-0">{course.courseTeacher}</p>
                          </div>
                      </div> 

                      <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                          <i className="bi bi-tags text-info"></i>
                          <div>
                          <p className="mb-0">Time</p>
                          <p className="mb-0">{course?.routine?.[0]?.start} - {course?.routine?.[0]?.end}</p>
                          </div>
                      </div>

                      <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                          <i className="bi bi-clock text-warning"></i>
                          <div>
                          <p className="mb-0">Location</p>
                          <p className="mb-0">{course?.routine?.[0]?.room}</p>
                          </div>
                      </div>

                      <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                          <i className="bi bi-list-check text-success"></i>
                          <div>
                          <p className="mb-0">Duration</p>
                          <p className="mb-0">{(course?.routine?.[0].end.split(":").map(Number)[0] - course?.routine?.[0].start.split(":").map(Number)[0])*60 + 
                            course?.routine?.[0].end.split(":").map(Number)[1] - course?.routine?.[0].start.split(":").map(Number)[1]}</p>
                          </div>
                      </div>
                      </div>
                  </div>
                </div> 
            ))  
          )}
        </div>
        </div>
      </div>
      


      {/* Test Schedule */}
      <hr className="m-5"/>
      <div id="scheduled-test ">
        <h2 className="text-primary ms-2">All Scheduled Tests</h2>

          <div className="crd-len-2">
        <div className="row gap-2 d-flex align-items-stretch mt-3 ">
          {testInfo?.length > 0 ? (
            testInfo.map((t, i) =>(

              <div className="col-11 col-md-6 col-lg-4">
              <div className="crd-2 p-0 h-100 border rounded-3 overflow-hidden">

                  <div className="row m-0 p-3 justify-content-between align-items-center bg-info text-white rounded-top">
                  <h2 className="col-10 mb-0 d-flex align-items-center">
                      <BookOpen size={30} className="text-"/> &nbsp;
                      { t.courseName}
                  </h2>

                  <div className="col-2 text-end">
                      <p className="mb-0">Mark</p>
                      <p className="mb-0 fw-bold">{t.testMark}</p>
                  </div>
                  </div>

                  {/* Body */}
                  <div className="row align-items-center justify-content-evenly p-3">

                  <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                    <div className="h-100 d-flex align-items-center gap-2">
                      <Clock size={16} />
                      <div>
                      <p className="mb-0">Date</p>
                      <p className="mb-0 fw-600 text-primary">{t.testDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                    <div className="h-100 d-flex align-items-center gap-2">
                      <Tags size={16} className='text-info'/>
                      <div>
                      <p className="mb-0">Course Id</p>
                      <p className="mb-0">{t.courseID.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>


                  <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                    <div className="h-100 d-flex align-items-center gap-2">
                      <File size={16} className='text-success'/>
                      <div>
                      <p className="mb-0">Test Type</p>
                      <p className="mb-0">{t.testType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border mb-3">
                    <div className="h-100 d-flex align-items-center gap-2">
                      <CircleCheck size={16} className='text-warning'/>
                      <div>
                      <p className="mb-0">Status</p>
                      <p className="mb-0">Upcoming</p>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary p-2 col-11">
                      Update Test Mark <ChevronRight size="20px" className='text-light'/>
                  </button>

                  </div>

              </div>
              </div>
                ) 
              )): (
                <p className="text-center text-primary">No tests scheduled yet.</p>
              )}
              </div>
        </div>
      </div>

      <hr className="full-hr" />

      
    </>
  );
}

export default TodaysSchedule;
