import React, { useState } from "react";
import { BookOpen, Calendar, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
function MyCourses() {
  const [showForm, setShowForm] = useState(false);
  const [requestInfo, setRequestInfo] = useState({
    semester: "",
    courseName: "",
    courseTeacher: "",
  });

  return (
    <div className="ms-2">
      <div className="crd-len-2">
        <div className="row p-2">
          <div className="col-12">
            <div className="crd-2">
              This part is for quote randomly slected from db after fixed amount
              of time
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-primary mt-3">Your Semester Course in Details</h1>

      <div className="crd-len-2">
        <div className="intro-box-grid p-2 justify-content-start align-items-stretch">
          <div className=" mt-2">
            <div className="crd-2 text-center h-100">
              <h4 className="mb-0 text-indigo-100">Total Courses</h4>
              <p className="mb-0 fs-4 fw-bold">10</p>
            </div>
          </div>
          <div className=" mt-2">
            <div className="crd-2 text-center h-100">
              <h4 className="mb-0 text-indigo-100">Theory Courses</h4>
              <p className="mb-0 fs-4 fw-bold">4</p>
            </div>
          </div>
          <div className=" mt-2">
            <div className="crd-2 text-center h-100">
              <h4 className="mb-0 text-indigo-100">Lab Courses</h4>
              <p className="mb-0 fs-4 fw-bold">6</p>
            </div>
          </div>
          <div className=" mt-2">
            <div className="crd-2 text-center h-100">
              <h4 className="mb-0 text-indigo-100">Active User</h4>
              <p className="mb-0 fs-4 fw-bold">1300</p>
            </div>
          </div>
          <div className=" mt-2">
            <div className="crd-2 text-center h-100">
              <h4
                className="mb-0 pointer text-indigo-100"
                onClick={() => setShowForm((prev) => !prev)}
              > Enroll in backlog course
              </h4>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 text-primary">
        Courses <ChevronRight size="20px" className="text-success" /> Theory
      </h2>

      <div className="course-grid">
        <div className="crd-2 p-0">
          <div className="d-flex m-0 p-3 justify-content-between align-items-center bg-info text-indigo-100 rounded-top">
            <h4 className=" mb-0 d-flex align-items-center ">  <i className="bi bi-book me-2"></i>  Software Engineering </h4>

            <div className="col-3 text-end">
              <p className="mb-0 fw-bold">1.5</p>
              <p className="mb-0">CREDITS</p>
            </div>
          </div>

          <div className=" d-grid mb-3 ps-2 pe-2">
            <div className="grid-item-top-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
              <i className="bi bi-person-video3 text-primary"></i>
              <div>
                <p className="mb-0">Course Teacher</p>
                <p className="mb-0">Shisir Mia</p>
              </div>
            </div>

            <div className="grid-item-top-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
              <i className="bi bi-tags text-info"></i>
              <div>
                <p className="mb-0">Course Id</p>
                <p className="mb-0">CSE3105</p>
              </div>
            </div>

            <div className="grid-item-bottom-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
              <i className="bi bi-clock text-warning"></i>
              <div>
                <p className="mb-0">Total Class Hour</p>
                <p className="mb-0">120 Hours</p>
              </div>
            </div>

            <div className="grid-item-bottom-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
              <i className="bi bi-list-check text-success"></i>
              <div>
                <p className="mb-0">Total Taken Class</p>
                <p className="mb-0">12 / 30</p>
              </div>
            </div>

            <button className="btn btn-primary w-100 p-2 grid-item-full">
              View Issued Supplements{" "}
              <ChevronRight size="20px" className="text-light" />
            </button>
          </div>
        </div>
      </div>




      <h2 className="mt-5 text-primary">  Courses <ChevronRight size="20px" className="text-success" /> Lab </h2>
      <div className="course-grid">
        <div className="crd-2 p-0">
          {/* Header */}
          <div className="d-flex m-0 p-3 justify-content-between align-items-center bg-info text-indigo-100 rounded-top">
            <h4 className="col-9 mb-0 d-flex align-items-center">
              <i className="bi bi-book me-2"></i>  Software Engineering Lab
            </h4>
            <div className="col-3 text-end">
              <p className="mb-0 fw-bold">1.5</p>
              <p className="mb-0">CREDITS</p>
            </div>
          </div>

          <div className=" d-grid mb-3 ps-2 pe-2">
            <div className="grid-item-top-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border">
              <i className="bi bi-person-video3 text-primary"></i>
              <div>
                <p className="mb-0">Course Teacher</p>
                <p className="mb-0">Shisir Mia</p>
              </div>
            </div>

            <div className="grid-item-top-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border">
              <i className="bi bi-tags text-info"></i>
              <div>
                <p className="mb-0">Course Id</p>
                <p className="mb-0">CSE3105</p>
              </div>
            </div>

            <div className="grid-item-bottom-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border">
              <i className="bi bi-clock text-warning"></i>
              <div>
                <p className="mb-0">Total Class Hour</p>
                <p className="mb-0">120 Hours</p>
              </div>
            </div>

            <div className="grid-item-bottom-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 border">
              <i className="bi bi-list-check text-success"></i>
              <div>
                <p className="mb-0">Total Taken Class</p>
                <p className="mb-0">12 / 30</p>
              </div>
            </div>

            <button className="btn btn-primary w-100 p-2 grid-item-full">
              View Issued Supplements{" "}
              <ChevronRight size="20px" className="text-light" />
            </button>
          </div>
        </div>
      </div>




      {/* Enroll backlog course */}
      <div
        className={`overlay ${showForm ? "visible" : ""}`}
        onClick={() => setShowForm((prev) => !prev)}
      ></div>
      <div className={`float-form ${showForm ? "active" : ""} p-4`}>
        <h4 className="text-primary fw-600">Request for backlog course</h4>
        <hr />
        <i
          className="bi bi-x-lg fw-bold cross-sign pointer"
          onClick={() => setShowForm((prev) => !prev)}
        ></i>
        <label htmlFor="" className="form-label mb-0">
          Semester
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setRequestInfo({ ...requestInfo, semester: e.target.value })
          }
          value={requestInfo.semester}
          placeholder="e.g. 5"
          required
        />

        <label htmlFor="" className="form-label mt-3 mb-0">
          Course Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setRequestInfo({ ...requestInfo, courseName: e.target.value })
          }
          value={requestInfo.courseName}
          placeholder="e.g. Software Engineering"
          required
        />

        <label htmlFor="" className="form-label mt-3 mb-0">
          Course Teacher
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setRequestInfo({ ...requestInfo, courseTeacher: e.target.value })
          }
          value={requestInfo.courseTeacher}
          placeholder="e.g. Shisir Mia"
          required
        />
        <div className="d-grid">
          <button type="submit" className="btn btn-primary  mt-3">
            {" "}
            <i class="bi bi-send"></i> Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
