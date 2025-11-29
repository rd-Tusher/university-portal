import React from "react";
import { scheduleData } from "../../Components/KeyValueObject";

function CourseForm({
  courseMetaData,
  courseData,
  handleChange,
  onRemove,
  courseBlockNumber,
  handleroutines,
  addClassSchedule,
  removeScheduelBlcok
}) {
  return (
    <div className="pos-rel border border-light rounded-3 p-3 mt-3">
      {/* Header */}
      <div className="d-flex justify-content-between mb-3">
        <div className="text-primary">{`Course #${courseBlockNumber}`}</div>
        <div className="pointer" onClick={onRemove}>&times;</div>
      </div>

      {/* Course Info */}
      <div className="row">
        {courseMetaData.map((course, index) => (
          <div key={index} className="col-12 col-md-6 mb-2">
            <label htmlFor={course.name} className="form-label">
              {course.label}
            </label>
            <input
              id={course.name}
              type={course.type}
              placeholder={course.placeholder}
              className="form-control"
              value={courseData[course.name] || ""}
              onChange={(e) => handleChange(course.name, e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      {/* Schedule Inputs */}
      <div className="p-4 rounded-3">
        {courseData.routines.map((dayObj, dayIndex) => (
          <div key={dayIndex} className="row mb-4 border border-light p-2 rounded-3">
            <div className="d-flex justify-content-between mb-2">
              <div className="text-primary">{`Day #${dayIndex + 1}`}</div>
              <div
                className="pointer text-danger fw-bold"
                onClick={() => removeScheduelBlcok(dayIndex)}
              >
                &times;
              </div>
            </div>

            {scheduleData.map((field) => (
              <div className="col-6 mb-2" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className="form-control"
                  value={dayObj[field.name] || ""}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    handleroutines(field.name, e.target.value, dayIndex)
                  }
                  required
                />
              </div>
            ))}
          </div>
        ))}
      <div className="d-grid">
        <button  type="button"  onClick={addClassSchedule}  className="btn btn-outline-primary mt-3">  + Add More Schedule</button>
      </div>
      </div>
    </div>
  );
}

export default CourseForm;
