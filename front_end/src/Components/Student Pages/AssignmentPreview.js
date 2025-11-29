import React, { useState } from 'react'
import { BookOpen, Calendar, ChevronRight, CheckCircle} from 'lucide-react';
import {Link} from 'react-router-dom'
import { subjectMap } from '../KeyValueObject';
function AssignmentPreview() {
    const [assgInfo, setAssgInfo] = useState(null);
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

        <div className='mt-4 '>
            <h2>Assignment Tracker</h2>
            <div className="intro-box-grid p-2 align-items-stretch">
            <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100 ">Total Assignment</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
                <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100">Upcoming Assignment</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
            <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100">Overdue Assignment</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
                <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100">Submitted</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
            <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100">Not Submitted</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
            <div className=" mt-2">
                <div className="crd-2 text-center h-100">
                <h4 className="mb-0 text-indigo-100">Active User</h4>
                <p className="mb-0 fs-4 fw-bold">500</p>
                </div>
            </div>
            </div>
        </div> 


 
        <div className='ps-2 mt-4'>
            <h2 className='text-primary'> Assignments <ChevronRight size="20px" className='text-success'/> Upcoming</h2>
            <div className=" p-1">
                <div className="assg-grid gap-0">
                    <div className="crd-2 p-0 ">
                        <div className='bg-info rounded-top p-2 text-indigo-100'>
                            <p className='mb-0'>Operating System</p>
                            <p className='fs-5 '>Implement os Scheduling using c Language</p>
                        </div>
                        <div className='d-grid  p-2 align-items-center justify-content-center'>
                            <div className="grid-item-top-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
                                <Calendar size={15} className='text-warning' />
                                <div>
                                    <p className="mb-0">Due Date</p>
                                    <p className="mb-0">12-04-2030</p>
                                </div>
                            </div>
                            <div className="grid-item-top-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
                                <CheckCircle size={15} className='text-warning'/>
                                <div>
                                    <p className="mb-0">Status</p>
                                    <p className="mb-0">Pending</p>
                                </div>
                            </div>
                        </div>
                            <Link
                            to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="butn text-decoration-none d-flex align-items-center justify-content-center mb-2">    View Details <ChevronRight className="ms-1 butn-arrow" /> 
                        </Link>
                    </div>
            </div>
        </div>
    </div>

 
        <div className='ps-2 mt-4'>
            <h2 className='text-primary'> Assignments <ChevronRight size="20px" className='text-success'/> Overdue</h2>
            <div className=" p-1">
                <div className="assg-grid gap-0">
                    <div className="crd-2 p-0 ">
                        <div className='bg-info rounded-top p-2 text-indigo-100'>
                            <p className='mb-0'>Operating System</p>
                            <p className='fs-5 '>Implement os Scheduling using c Language</p>
                        </div>
                        <div className='d-grid  p-2 align-items-center justify-content-center'>
                            <div className="grid-item-top-right d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
                                <Calendar size={15} className='text-warning' />
                                <div>
                                    <p className="mb-0">Due Date</p>
                                    <p className="mb-0">12-04-2030</p>
                                </div>
                            </div>
                            <div className="grid-item-top-left d-flex align-items-center gap-3 bg-bluish p-3 rounded-3 ">
                                <CheckCircle size={15} className='text-warning'/>
                                <div>
                                    <p className="mb-0">Status</p>
                                    <p className="mb-0">Pending</p>
                                </div>
                            </div>
                        </div>
                            <Link
                            to={`/assignment/${assgInfo?.dept}/${assgInfo?.courseID}/${assgInfo?.assgId}/submit`}
                            className="butn text-decoration-none d-flex align-items-center justify-content-center mb-2">    View Details <ChevronRight className="ms-1 butn-arrow" /> 
                        </Link>
                    </div>
            </div>
        </div>
    </div>

    </div>
  )
} 

export default AssignmentPreview;