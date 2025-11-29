import React from "react";
import { ArrowRight } from "lucide-react";
function StudentProfile() {
  return (
    <>
      <div className="crd-len-2">
        <div className="row p-2 justify-content-center">
          <div className="col-12">
            <div className="crd-2 pos-rel">
              <div className="update">
                <i className="bi bi-pencil-square text-primary pointer"></i>
              </div>
              <div className="row mt-5">
                <div className="col-6 col-md-4 col-lg-3">
                  <div
                    className="profile-pic"
                    style={{ width: "100px", height: "100px" }}
                  ></div>
                </div>
                <div className="col-6 col-md-8 col-lg-9">
                  <div className="fs-2 text-primary">
                    Welcome back , look a everything at a glimpse{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="crd-len-2">
        <div className="profile-grid p-2 justify-content-center aligh-items-stretch">
          <div className="crd-2 h-100">
            <div>
              <h2 className="text-primary mb-0 p-0">Personal Info</h2>
              <small className="mt-0">Your uploaded info</small>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="fullname" className="form-label">
                  Full name
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="fullname" className="form-label">
                  Id
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="fullname" className="form-label">
                  Department
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="fullname" className="form-label">
                  Year
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="fullname" className="form-label">
                  Date of Birth
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="">
            <div className="crd-2 h-100 ">
              <p className="fs-5">this is for calender</p>
            </div>
          </div>
        </div>
      </div>

      <div className="crd-len-2">
        <div className="p-2 justify-content-center aligh-items-stretch">
          <div className=" profile-grid">
            {/* 1 */}
            <div className="crd-2 grid-item-1">
              <h2 className="text-primary">Contact Details</h2>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="" className="form-label">  Email{" "}</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="form-label">  Phone number </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>


            {/* 2 */}
            <div className="crd-2 grid-item-2">
              <div>
                <h2 className="text-primary mb-0">Recent published Result</h2>
                <small>published at 12-09-2025</small>
              </div>

              <div className="d-grid">
                <div className="grid-item-top-left mb-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0"> A <sup>+</sup> </p>
                  </div>
                </div>
                <div className="grid-item-top-right mb-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0"> A <sup>+</sup>  </p>
                  </div>
                </div>
                <div className="grid-item-bottom-left mt-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0"> A <sup>+</sup> </p>
                  </div>
                </div>
                <div className="grid-item-bottom-right mt-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0"> A <sup>+</sup> </p>
                  </div>
                </div>
              </div>
              <div className="butn "> {" "} View all results <ArrowRight   className="butn-arrow"   size={20}  />{" "} </div>
            </div>


            {/* 3 */}
            <div className="crd-2 grid-item-3">
              <div >
                <h2 className="text-primary mb-0 d-block">Academic Summary</h2>
                <small>Your latest update</small>
              </div>
              <div className="text-center border border-info p-2 rounded-3 mb-1">
                <h4 className="text-info">Current CGPA</h4>
                <p className="mb-0">3.49</p>
              </div>
              <div className="text-center border border-info p-2 rounded-3 mb-1">
                <h4 className="text-info mb-0">Total Earned Credit</h4>
                <h5 className="mb-0">   80 <sub className="fs-8">120</sub>{" "} </h5>
              </div>
              <div className="text-center border border-info p-2 rounded-3">
                <h4 className="text-info">Current Semester</h4>
                <p className="mb-0">   5 <sub>8</sub>{" "} </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="crd-len-2">
        <div className="row p-2 justify-content-center align-items-stretch">
          <div className="col-12 col-md-7 ">
            <div className="crd-2 h-100">
              <div>
                <h2 className="text-primary mb-0">Recent published Result</h2>
                <small>published at 12-09-2025</small>
              </div>

              <div className="d-grid">
                <div className="grid-item-top-left mb-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0">   A <sup>+</sup> </p>
                  </div>
                </div>
                <div className="grid-item-top-right mb-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0">  A <sup>+</sup></p>
                  </div>
                </div>
                <div className="grid-item-bottom-left mt-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0">   A <sup>+</sup> </p>
                  </div>
                </div>
                <div className="grid-item-bottom-right mt-2">
                  <div className="border border-info rounded-3 p-2 d-flex justify-content-between">
                    <p className="wrap mb-0">Software Engineering</p>
                    <p className="mb-0">   A <sup>+</sup> </p>
                  </div>
                </div>
              </div>
              <div className="text-primary pointer">  {" "}  View all results <ArrowRight size={20} />{" "}</div>
            </div>
          </div>

          <div className="col-12 col-md-5 ">
            <div className="crd-2 h-100"></div>
          </div>
        </div>
      </div>

      <div className="crd-len-2">
        <div className="row p-2 justify-content-center align-items-stretch">
          <div className="col-12 col-md-7">
            <div className="crd-2 h-100">
              <h2 className="text-primary">Addional Links</h2>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="crd-2 h-100"></div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5 fs-5 text-primary text-center"></div>
    </>
  );
}

export default StudentProfile;
