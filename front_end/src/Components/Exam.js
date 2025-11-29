import React from 'react'
import { BookOpen, Calendar, ChevronRight, CheckCircle,File} from 'lucide-react';
import {Link} from 'react-router-dom'
function Exam() {
  return (
    <div>
        <div className="crd-len-2">
            <div className="row p-2">
                <div className="col-12">
                    <div className="crd-2">
                        This part is for quote randomly slected from db after fixed amount of time
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h2 className='text-primary'>Test Tracker</h2>
            <div className="intro-box-grid p-2 align-items-stretch">
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Total Test</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>5</p>
                    </div>
                </div>
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Class Test</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>5</p>
                    </div>
                </div>
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Lab Test/Quiz</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>5</p>
                    </div>
                </div>
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Lab</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>1</p>
                    </div>
                </div>
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Final Exam</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>5</p>
                        <small className='m-0 p-0 text-center text-success'>Should not miss!</small>
                    </div>
                </div>
                <div className=" mt-1">
                    <div className="crd-2 h-100">
                        <p className='text-center fs-5 fw-600 text-indigo-100 mb-0'>Active User</p>
                        <p className='text-center fs-5 fw-bold mb-0 text-primary'>500</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='ps-2 mt-4'>
            <h2 className='text-primary'> Test <ChevronRight size="20px" className='text-success'/> Class Test</h2>
            <div className="row p-2">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="crd-2">
                        <p className='mb-0 fs-5 fw-600 text-center mb-0'>Software Engineering</p>
                        <hr className='m-0 p-0'/>
 
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <BookOpen size={16} className="text-primary me-1" /></span>
                                <span className="m-0">CoureID</span>
                            </div> 
                            <p className="m-0">CSE-3101</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <Calendar size={16} className="text-primary me-1" /></span>
                                <span className="m-0">Test Date</span>
                            </div> 
                            <p className="m-0">12-12-2025</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <CheckCircle size={16} className="text-warning me-1" /></span>
                                <span className="m-0">Status</span>
                            </div> 
                            <p className="m-0 ">Upcoming</p>
                        </div>
                        <Link
                            // to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                        >
                            View Details <ChevronRight className="ms-1" />
                        </Link>
                    </div> 
                </div>
            </div>
        </div>

        <div className='ps-2 mt-4'>
            <h2 className='text-primary'> Test <ChevronRight size="20px" className='text-success'/> Lab Test / Quiz</h2>
            <div className="row p-2">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="crd-2">
                        <p className='mb-0 fs-5 fw-600 text-center mb-0'>Software Engineering</p>
                        <hr className='m-0 p-0'/>
 
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <BookOpen size={16} className="text-primary me-1" /></span>
                                <span className="m-0">CoureID</span>
                            </div> 
                            <p className="m-0">cse3101</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <Calendar size={16} className="text-primary me-1" /></span>
                                <span className="m-0">Test Date</span>
                            </div> 
                            <p className="m-0">12-12-2025</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <CheckCircle size={16} className="text-warning me-1" /></span>
                                <span className="m-0">Status</span>
                            </div> 
                            <p className="m-0 ">Upcoming</p>
                        </div>
                        <Link
                            // to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                        >
                            View Details <ChevronRight className="ms-1" />
                        </Link>
                    </div> 
                </div>
            </div>
        </div>

        <div className='ps-2 mt-4'>
            <h2 className='text-primary'> Test <ChevronRight size="20px" className='text-success'/> Lab Final</h2>
            <div className="row p-2">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="crd-2">
                        <p className='mb-0 fs-5 fw-600 text-center mb-0'>Software Engineering</p>
                        <hr className='m-0 p-0'/>
 
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <BookOpen size={16} className="text-primary me-1" /></span>
                                <span className="m-0">CoureID</span>
                            </div> 
                            <p className="m-0">cse3101</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <Calendar size={16} className="text-primary me-1" /></span>
                                <span className="m-0">Test Date</span>
                            </div> 
                            <p className="m-0">12-12-2025</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <CheckCircle size={16} className="text-warning me-1" /></span>
                                <span className="m-0">Status</span>
                            </div> 
                            <p className="m-0 ">Upcoming</p>
                        </div>
                        <Link
                            // to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                        >
                            View Details <ChevronRight className="ms-1" />
                        </Link>
                    </div> 
                </div>
            </div>
        </div>

        <div className='ps-2 mt-4'>
            <div className="d-flex justify-content-betwen align-items-center">
                <h2 className='text-primary'> Test <ChevronRight size="20px" className='text-success'/> Final Eam</h2>
                <sub className='me-3 text-primary pointer'> &nbsp;Download Routine</sub>
            </div>
            <div className="row p-2">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="crd-2">
                        <p className='mb-0 fs-5 fw-600 text-center mb-0'>Software Engineering</p>
                        <hr className='m-0 p-0'/>
 
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <BookOpen size={16} className="text-primary me-1" /></span>
                                <span className="m-0">CoureID</span>
                            </div> 
                            <p className="m-0">cse3101</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <Calendar size={16} className="text-primary me-1" /></span>
                                <span className="m-0">Due Date</span>
                            </div> 
                            <p className="m-0">12-12-2025</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                            <span> <CheckCircle size={16} className="text-warning me-1" /></span>
                                <span className="m-0">Status</span>
                            </div> 
                            <p className="m-0 ">Pending</p>
                        </div>
                        <Link
                            // to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                        >
                            View Details <ChevronRight className="ms-1" />
                        </Link>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Exam;