import React from 'react'
import { useNavigate } from 'react-router-dom';
import { User,LayoutDashboard,BookOpen,Clock,ClipboardCheck,ListChecks,Gauge,LogOut,PanelLeftClose, PanelLeftOpen } from "lucide-react";


function StudentNavbar() { 
  const navigate = useNavigate();
  return (
    <>
        <nav className='side-bar pos-rel'>
            <ul>
              <div className='mb-4 mt-5'>
                <li className='pointer' onClick={()=>{navigate("/student/profile")}}><h4 className='mb-0 sidebar-option' >Tusher Debnath</h4>
                <small className='mb-0 p-0 sidebar-option'>Student</small></li>
                <li className='pointer mb-4' onClick={() => navigate("/student/profile")}>  <User className='sidebar-user' size={20} /> </li>
              </div>


              <li className='pointer mb-4' tooltip="hi" onClick={() => navigate("/student/dashboard")}>  <LayoutDashboard size={20}  /> <span className='sidebar-option'> &nbsp; Dashboard</span></li>

              <li className='pointer mb-4' onClick={() => navigate("/student/enrolled/courses")}>  <BookOpen size={20} />  <span className='sidebar-option'> &nbsp; My Courses</span></li>

              <li className='pointer mb-4' onClick={() => navigate("/student/today-schedule")}>  <Clock size={20} />  <span className='sidebar-option'> &nbsp; Schedule</span></li>

              <li className='pointer mb-4' onClick={() => navigate("/student/exam/details")}>  <ClipboardCheck size={20} />  <span className='sidebar-option'> &nbsp; Exam / Test</span></li>

              <li className='pointer mb-4' onClick={() => navigate("/student/preview/assignment")}>  <ListChecks size={20} />  <span className='sidebar-option'> &nbsp; Assignment</span></li>

              <li className='pointer mb-4'>  <Gauge size={20} />  <span className='sidebar-option'> &nbsp; Performance</span></li>

              <li className='pointer mb-4'>  <LogOut size={20} />  <span className='sidebar-option'> &nbsp; Log Out</span></li>

            </ul>
                <PanelLeftClose className='sidebar-close pointer' size={20} />
                <PanelLeftOpen className='sidebar-open pointer' size={20} />

        </nav>
    </>
  )
}

export default StudentNavbar;