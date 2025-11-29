import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { departmentMap } from "../KeyValueObject";
import { Ongoing,renderSchedule, scheduledTest } from "../../Utils/DashboardUtils";
import axios from "axios";
function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const navigate = useNavigate();
  const [totalCourse, settotalCourse] = useState(0);
  const [ongoing, setOngoing] = useState([]);
  const [testInfo, setTestInfo] = useState([]);


  useEffect(()=>{
    async function ftc(){
      try{

        const [studentRes,courseRes,testRes] = await Promise.allSettled([
            axios.get(`http://localhost:8080/fetch-user-info`,{withCredentials:true}),
            axios.get( `http://localhost:8080/fetch-course-info-student`,{withCredentials:true}),
            axios.get( `http://localhost:8080/fetch-test-nm-id-dt`,{withCredentials:true})
        ]);
        

        if(courseRes.value.status === 200){
          setCourseInfo(courseRes?.value.data);
        }
        if(studentRes.value.status === 200){
          setUserInfo(studentRes?.value.data);
        }
        if(testRes.value.status === 200){
          setTestInfo(testRes?.value.data);
        }
 
      } catch(error){
        console.log(error);
      }
    }
    ftc();
  },[navigate]);


  const renderCourse = (obj,l)=>{
    const courses = Array.isArray(obj) ? obj : []; 
    return(
      <> 
        <div>
          {(!courses || courses?.length === 0) ? (
            <h4 key="no-classes" className="fw-bold text-center m-3">
              No classes for the time...
            </h4>
          ) : (
            courses?.slice(0, l)?.map((course, index) => (
              <div key={course?.id || `course-${index}`} className="lst-bg mb-2 text-dark">
                <div className="lsn crd-title">{course?.courseName}</div>
                <div className="lsn crd-sub">{course?.courseTeacher}</div>
              </div>
            ))
          )}
        </div>
      </>
    )
  }

  return (
    <>
    {/* {userInfo && ( */}
    <div className="min-vh-100 ">
      {/* welcome block */}
      <div className="mh"></div>
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12">
            <div className="crd-2">

        <div className="crd-header">
          <div>
             <div className="crd-title"> Welcome Back , <strong className="text-primary pointer">{userInfo?.fullname}</strong> 👋 </div>
            <div className="crd-header">
              {" "}
              Here's a quick overview of your day.{" "}
            </div>
          </div>
          <div className="see_profile crd-header pointer">View Profile</div>
        </div>

        <div className="user_info">
          <div>
            <svg
              viewBox="0 0 64 64"
              width="50"
              height="50"
              className="user_icon pointer"
            >
              <circle cx="32" cy="20" r="12" />
              <path d="M16,52 C16,40 48,40 48,52 Z" />
            </svg>
          </div>
          <div className="crd-header"> ID : {userInfo?.userID?.toUpperCase()}</div>
          <div className="crd-header">
            {" "}
            Department : {departmentMap[userInfo?.department]}{" "}
          </div>
          <div className="semester">Semester {userInfo?.semester}</div>
        </div>
          </div>
          </div>
        </div>
      </div>

      {/* schedule block */} 
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12 col-md-7">
            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="crd-title">Today's Class Schedule</div>
                  <small className="crd-sub">Quic view - click to expand</small>
                </div>
                <small className="pill">Total  : {totalCourse}</small>
              </div>
              {/* {renderCourse(ongoing,1)} */}
 
              <div>
                <button  className={`btn btn-outline-primary`}  onClick={()=>{navigate("/student/today-schedule")}}>  View All</button>             
              </div>
            </div>
          </div> 

          {/* Class Test */}
          <div className="col-12 col-md-5 pos-rel">
            <div className="crd-2">
              <div className="dis-flex">
                <div className="lsn crd-title">Class Test Schdule</div>
                <small className="pill">Total : {testInfo?.length}</small>
              </div>
              {testInfo?.slice(0,Math.min(2,testInfo?.length)).map((test,index)=>(
                <div key={index} classname="lst-bg crd-header">
                  <div>
                    <div className="lsn crd-title">  {test.courseName} - {test.testID}  </div>
                  </div>
                  <small className="lsn">Scheduled at {test.testDate}</small>
                </div>
              ))}
              <div>
                <button  className={`btn btn-outline-primary`}  >  View Full</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12 col-md-7">

            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="lsn crd-title">Courses</div>
                  <div className="lsn  crd-header">Your enrolled courses.</div>
                </div>
                <div className="lsn pill">Total : {courseInfo?.length}</div>
              </div>
              <div>

              {renderCourse(courseInfo,3) }
              </div>
              <div>
                <button  className={`btn btn-outline-primary`}  onClick={()=>{navigate("/today-schedule")}}>  View Full</button>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="col-12 col-md-5">
            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="crd-title lsn">Course Content</div>
                  <div className="lsn crd-sub">Provided by teacher</div>
                </div>
                <div className="lsn pill">Total 21</div>
              </div>
              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">
                    Introduction to software engineering
                  </div>
                  <div className="lsn crd-sub">Mohammod Shisir Miah</div>
                </div>
                <div>2 days ago</div>
              </div>
              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">Multimedia and Web Design</div>
                  <div className="lsn crd-sub">sultan Ahmed</div>
                </div>
                <div>1 days ago</div>
              </div>
              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">
                    Relational and Database Management System
                  </div>
                  <div className="lsn crd-sub">Mostfa kamal Nasir</div>
                </div>
                <div>4 days ago</div>
              </div>
              <div>
                <button className="btn btn-outline-primary">View All</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12 col-md-7">
            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="crd-title">Semester Final Result</div>
                  <div className="crd-header">Latest pubdivshed result</div>
                </div>
                <small className="lsn">Published at : 23-05-2024</small>
              </div>
              <div className="lst-bg crd-header">
                <div className="lsn crd-title">
                  {" "}
                  Algorithm Design and Analysis{" "}
                </div>
                <div className="lsn pill"> {" "} A <sup>  <small>+</small> </sup>  </div>
              </div>
              <div className="lst-bg crd-header crd-title">
                <div className="lsn">Database Management System </div>
                <div className="lsn pill">B</div>
              </div>
              <div className="lst-bg crd-header crd-title">
                <div className="lsn">
                  Fourier Analysis and Laplace Transform{" "}
                </div>
                <div className="lsn pill"> {" "} F <sup>  <small>+</small> </sup>{" "}</div>
              </div>
              <div>
                <button className="btn btn-outline-primary">View All</button>
                {/* <div className="semester">Semester 5</div> */}
              </div>
            </div>
          </div>

          {/* Class Test Result */}
          <div className="col-12 col-md-5">
            <div className="crd-2">
              <div className="crd-header">
                <div className="lsn crd-title">Class Test Result</div>
              </div>
              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">Operating System</div>
                  <div className="lsn crd-sub">Updated 2 days</div>
                </div>
                <div>23 (40)</div>
              </div>
              <div>
                <button className="btn btn-outline-primary">View Full</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Event */}
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12 col-md-7">
            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="lsn crd-title">Upcoming Event</div>
                  <div className="lsn crd-sub">Let's Enjoy</div>
                </div>
                <div className="pill">Total 3</div>
              </div>

              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">CSE Premier League</div>
                  <div className="lsn crd-sub">
                    Goint to be started at 6 Nov
                  </div>
                </div>
                <div className="pill">4 days left</div>
              </div>

              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">Chirkut band music show</div>
                  <div className="lsn crd-sub">
                    Goint to be started at 21 Oct
                  </div>
                </div>
                <div className="pill">21 days left</div>
              </div>
              <div className="text-primary fw-600 text-center">Publish new event news</div>
            </div>
            
          </div>

          {/* Recent highlights */}
          <div className="col-12 col-md-5">
            <div className="crd-2">
              <div className="crd-header">
                <div>
                  <div className="lsn crd-title">Recent highlights</div>
                  <div className="lsn crd-sub">
                    Announcements and Hightdivghts
                  </div>
                </div>
              </div>

              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">
                    Sports fest registration open<sup>New</sup>{" "}
                  </div>
                  <div className="lsn crd-sub">available for students</div>
                </div>
              </div>
              <div className="crd-header lst-bg">
                <div>
                  <div className="lsn crd-title">
                    Sports fest registration open<sup>New</sup>{" "}
                  </div>
                  <div className="lsn crd-sub">available for students</div>
                </div>
              </div>
              <div className="text-primary fw-600 text-center">Publish recent highlights</div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
    {/* )} */}
    </>
  );
}

export default Dashboard;