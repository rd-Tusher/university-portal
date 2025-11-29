import { subjectMap } from "../Components/KeyValueObject";


export const sortCourse = (obj) => {
  if (!obj) return;
  
  console.log("hi");

  const sortedTodaysCourse = obj.sort((a, b) => {
    const timea = new Date(`1970-01-01T${a?.routine[0]?.start}`);
    const timeb = new Date(`1970-01-01T${b?.routine[0]?.start}`);
    return timea - timeb;
  });

  // sessionStorage.setItem(  "sortedTodaysCourse",  JSON.stringify(sortedTodaysCourse));
  return sortedTodaysCourse;
};

export const Ongoing = () => {
  const sortedTodaysCourse = JSON.parse(
    sessionStorage.getItem("sortedTodaysCourse")
  );
  const now = new Date();

  const ongoing = sortedTodaysCourse?.filter((course) => {
    const [startH, startM] = course.routine.start.split(":").map(Number);
    const [endH, endM] = course.routine.end.split(":").map(Number);

    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(startH, startM, 0, 0);
    endTime.setHours(endH, endM, 0, 0);

    return now >= startTime && now <= endTime;
  });
  return ongoing;
};

export const Completed = () => {
  const now = new Date();
  const sortedTodaysCourse = JSON.parse(sessionStorage.getItem("sortedTodaysCourse")) || [];

  const Completed = sortedTodaysCourse?.filter((course) => {
    const [endH, endM] = course?.routine.end.split(":").map(Number);

    const endTime = new Date();

    endTime.setHours(endH, endM, 0, 0);
    return endTime < now;
  });
  return Completed;
};

export const Upcoming = () => {
  const now = new Date();
  const sortedTodaysCourse =
    JSON.parse(sessionStorage.getItem("sortedTodaysCourse")) || [];

  const upcoming = sortedTodaysCourse?.filter((course) => {
    const [startH, startM] = course?.routine[0]?.start?.split(":").map(Number);
    const startTime = new Date();
    startTime.setHours(startH, startM, 0, 0);
    return startTime > now;
  });
  return upcoming;
};

export const getCourseStatus = (course) => {
  const firstRoutine = course?.routine?.[0];
  if (!firstRoutine?.start || !firstRoutine?.end) return "N/A";

  const now = new Date();

  const [startH, startM] = firstRoutine.start.split(":").map(Number);
  const [endH, endM] = firstRoutine.end.split(":").map(Number);

  const startTime = new Date();
  startTime.setHours(startH, startM, 0, 0);

  const endTime = new Date();
  endTime.setHours(endH, endM, 0, 0);

  if (now < startTime) return "Upcoming";
  if (now > endTime) return "Taken";
  return "Ongoing";
};

 
export const renderCourse = (course) => {
  console.log(course.routine);
  return (
    <div key={course.courseName}>
      <div className="p-3">
        <div className="d-flex gap-3 align-items-start justify-content-start">
          <i className="text-primary bi bi-book fs-3"></i>
          <div>
            <div className="fs-6">Course Name / Code</div>
            <div className="fw-bold fw-bold">
              {subjectMap[course.courseName] || course.courseName} -{" "}
              {course.courseID.toUpperCase()}
            </div>
          </div>
        </div> 
        <hr />
      </div>

      <div className="row mt-3 p-3">
        {/* Date */}
        <div className="col-6 text-center box-shadow rounded-3">
          <i className="text-primary bi bi-calendar-event me-2 fs-5"></i>
          <p className="mb-0">Day</p>
          <p className="fw-bold">{course?.routine[0].day}</p>
        </div>

        {/* Time */}
        <div className="col-6 text-center box-shadow rounded-3">
          <i className="text-primary bi bi-clock me-2 fs-5"></i>
          <p className="mb-0">Time</p>
          <p className="fw-bold"> 
            {" "}
            {course?.routine[0].start} - {course?.routine[0]?.end}{" "}
          </p>
        </div>
 
        {/* Duration */}
        <div className="col-6 text-center box-shadow rounded-3">
          <i className="text-primary bi bi-hourglass-split me-2 fs-5"></i>
          <p className="mb-0">Duration</p>
          <p className="fw-bold">
            {(course?.routine[0].end?.split(":").map(Number)[0] -
              course?.routine[0].start?.split(":").map(Number)[0]) *
              60 +
              course?.routine[0].end?.split(":").map(Number)[1] -
              course?.routine[0].start?.split(":").map(Number)[1]}{" "}
            minutes
          </p>
        </div> 
  
        {/* Room */}
        <div className="col-6 text-center box-shadow rounded-3">
          <i className="text-primary bi bi-geo-alt me-2 fs-5"></i>
          <p className="mb-0">Location</p>
          <p className="fw-bold">Room : {course.routine[0].room}</p>
        </div>

        <div className="col-6 text-center box-shadow rounded-3">
          <i className="text-primary bi bi-check-circle me-2 fs-5"></i>
          <p className="mb-0">Status</p>
          <p className="fw-bold"> {getCourseStatus(course)} </p>
        </div>
      </div>

      <div className="lst-bg pt-3 pb-3 m-2 d-flex align-items-center justify-content-between">
        <div>
          <i className="text-primary bi bi-person-circle mx-2"></i>
          <span className="fs-8 fw-bold">Instructor Name</span>
        </div>
        <span className="fw-bold fs-8">{course.courseTeacher}</span>
      </div>
    </div>
  );
};

export const allCourse = (course, index) => {
  return (
    <div key={index} className="border border-info rounded-3 p-2 m-3" >
      <div className="d-flex gap-3 align-items-center justify-content-start">
        <i className="text-primary bi bi-book text-info fs-"></i>
        <div>
          <div className="fs-6">Course Name / Code</div>
          <div className="fw-bold fw-bold"> 
            {subjectMap[course?.courseName] || course.courseName} -{" "}
            {course.courseID.toUpperCase()}
          </div>
        </div>
      </div>
      {/* <div className=" pt-3 m2 gap-3 d-flex align-items-center justify-content-between">
        <div>
          <i className="text-primary bi bi-person-circle mx-2 text-secondary"></i>
          <span>Instructor</span>
        </div>
        <span className="fs-md-2 fs-md-3">{course.courseTeacher}</span>
      </div> */}
      <div className="ms-3 mt-3">Instructor : {course.courseTeacher}</div>
      <div className="ms-3">course credit : 3</div>
      <div className="ms-3">Total course hour : 120</div>
      <div className="fs-8 mt-3 text-end text-primary pointer">
        view course outline
      </div>
    </div>
  );
};

export const routinedTest = (test, index) => {
  return (
    <>
      {test.routine.slice(0, 1).map((sch, i) => (
        <div key={index} className="crd-header lst-bg">
          <div>
            <div className="lsn crd-title">  {test.courseName} - {sch.testID}  </div>
          </div>
          <small className="lsn">routined at {sch.testDate}</small>
        </div>
      ))}
    </>
  ); 
};



export const classOccured= (completed)=>{
  
  const takenClass = completed.map(course=>({
    courseID : course.courseID
  }));
  
  console.log(takenClass);
} 