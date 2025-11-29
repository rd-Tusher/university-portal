import Select from "react-select";
import {
  department,
  semester,
  subjectMap,
} from "../../Components/KeyValueObject";
import { useEffect, useState } from "react";
import AttendComp from "./AttendComp";
import axios from "axios";

export default function Attendence() {
  const [dept, setDept] = useState("");
  const [sem, setSem] = useState("");
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentInfo, setStudentInfo] = useState([]);
  const [next, setNext] = useState(0);
  const [courses, setCourses] = useState([]);
  const [totalClass, setTotalClass] = useState(0);
  const [studentAtten, setStudentAtten] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      // fetching course and name id from db
      const URL = `http://localhost:8080/fetch-course-name-id?department=${dept}&semester=${sem}`;
      const response = await axios.get(URL);
      const coursesmap = response?.data?.map((course) => ({
        label: course.courseName,
        value: course.courseID,
      }));
      setCourses(coursesmap);
    };

    const fetchAtten = async () => {
      // fetching total class taken yet
      const URL = `http://localhost:8080/fetch-course-attendence-info?courseID=${courseID}`;
      try {
        const response = await axios.get(URL);
        setTotalClass(response.data.totalClass);
      } catch (error) {
        console.log(error);
      }
    };

    if (dept && sem) {
      fetchCourse();
    }
    if (courseID) {
      fetchAtten();
    }
  }, [dept, sem, courseID]);

  const handleClick = (studentID, courseID, present, absent, chr, i) => {
    if (i < studentInfo.length) {
      setStudentAtten((prev) =>
        prev.map((record) => {
          if (
            record.studentID === studentID &&
            record.courseID === courseID &&
            record.updatedAt !== new Date().toISOString().split("T")[0]
          ) {
            return {
              ...record,
              classAtten: present,
              classAbsent: absent,
              updatedAt: new Date().toISOString().split("T")[0],
            };
          }
          return record;
        })
      );
    }
  };

  const handleProceed = async () => {
    //
    const URL = `http://localhost:8080/fetch-all-user-id-info?department=${dept}&semester=${sem}`;
    const URL2 = `http://localhost:8080/fetch-student-attend-info?department=${dept}&semester=${sem}&courseID=${courseID}`;
    try {
      const [nameIDRes, attendRes] = await Promise.all([
        axios.get(URL),
        axios.get(URL2),
      ]);
      setStudentInfo(nameIDRes.data);
      setStudentAtten(attendRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseNext = () => {
    if (next < studentInfo.length - 1) {
      setNext((prev) => prev + 1);
    } else {
      setShowSubmit(true);
      console.log("all student are rendered!");
    }
  };



  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(studentAtten);

    const URL = 'http://localhost:8080/save-student-attendence-record';
    const URL2 = 'http://localhost:8080/save-course-attendence-info';
    try {
        const [sutRes,courseRes] = await Promise.all([
          axios.post(  URL,
            {  department : dept,  semester : sem,  courseID,  attens: studentAtten, 
          },
          {
            headers: {  
              'Content-Type': 'application/json'
            }
          }
        ),
        axios.post(URL2,
          {
            totalClass : totalClass + 1,
            updatedAt : new Date().toISOString().split("T")[0],
            courseID
          },
          {
            headers : {
              'Content-Type' : "application/json"
            }
          }
        )
      ]);
        
      console.log(sutRes);
      console.log(courseRes);
 
    } catch (error) { 
      console.log(error);
    }
  } 

  return (
    <>
      {studentInfo.length === 0 && (
        <div className="row ">
          <div className="col-12 col-md-8 col-lg-4 mt-100">
            <h1 className="text-info text-start">
              Select info to get student details
            </h1>
            <div className="attend-tch-ipt">
              <Select
                options={department}
                id="department"
                onChange={(selectedOption) => setDept(selectedOption.value)}
                value={department.find((s) => s.value === dept)}
                placeholder="Select department..."
                className="mt-4 mb-4"
              ></Select>

              <Select
                options={semester}
                id="semester"
                onChange={(selectedOption) => setSem(selectedOption.value)}
                value={semester.find((s) => s.value === sem)}
                placeholder="Select semester..."
              ></Select>

              <Select
                options={courses}
                id="courses"
                onChange={(selectedOption) => {
                  setCourseID(selectedOption.value);
                  setCourseName(selectedOption.label);
                }}
                value={courses.find((s) => s.value === sem)}
                placeholder="Select course..."
                className="mt-4"
              ></Select>

              <div className="d-grid">
                <button
                  type="button"
                  disabled={!dept || !sem || !courses.length}
                  className="btn btn-outline-light mt-3"
                  onClick={() => handleProceed()}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       {studentInfo.length > 0 &&
        studentInfo.slice(next, next + 1).map((student, index) => (
          <AttendComp
            name={student.fullName}
            studentID={student.studentID}
            present={studentAtten[next].classAtten}
            absent={studentAtten[next].classAbsent}
            onPress={increaseNext}
            courseID={courseID}
            courseName={subjectMap[courseName] || courseName}
            totalClass={totalClass}
            handleClick={(studentID, courseID, present, absent, chr) =>
              handleClick(studentID, courseID, present, absent, chr, next)
            }
          /> 
        ))}

      {showSubmit && (
          <div className="text-center mt-5">
            <p className="text-primary">
              Attendence of all students has been taken. Now you can submit the
              record
            </p> 
            <button className="btn btn-outline-info mb-5" onClick={(e)=>handleSubmit(e)}>Submit</button>
          </div>
      )} 

      {/* <div className="d-flex align-items-center justify-content-evenly">
        <div className="  p-3 m- text-start">
          {studentInfo.length > 0 &&
            studentInfo
              .slice(next, next + 1)
              .map((student, index) => (
                <AttendComp
                  key={student.studentID}
                  name={student.fullName}
                  studentID={student.studentID}
                  present={studentAtten[next].classAtten}
                  absent={studentAtten[next].classAbsent}
                  onPress={increaseNext}
                  courseID={courseID}
                  courseName={subjectMap[courseName] || courseName}
                  totalClass={totalClass}
                  handleClick={(studentID, courseID, present, absent, chr) =>
                    handleClick(studentID, courseID, present, absent, chr, next)
                  }
                />
              ))}
        </div>

        <div>
        {showSubmit && (
          <div className=" gap-2">
            <div className="mb-0 text-info text-center text-center">
              All records have been taken. You can submit now.
            </div>
            <div className="d-grid">
              <div className="btn btn-outline-info">Submit</div>
            </div>
          </div>
        )}
        </div>
      </div> */}
    </>
  );
}
