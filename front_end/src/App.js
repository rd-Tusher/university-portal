import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/LogIn';
import Register from './Pages/Register';
import Home from './Pages/Home';
import EmailVerificaion from './Pages/Email_Verify';
import { CtMarkPreCheck, StudentProtectedRoute } from './Components/Wrapper';
import { FormProvider } from './Components/customHooks';
// import Navbar from './Components/Navbar'
import TodaysSchedule from './Components/TodaysSchedule';
import Dashboard from './Components/Student Pages/Dashboard';
import AdminControl from './Pages/Admin/AdminControl';
import Profile from './Pages/Profile';
import UpdateCtMark from './Pages/Admin/updateCtMark';
import Motion from './Components/motion';
import Attendence from './Pages/Teacher/Attendence';
import Key from './Pages/Teacher/Key';
import ClassRoomMain from './Pages/Teacher/ClassRoomMain';
import Preview from './Components/Preview';
import Test2 from './Components/test2';
import Layout from './Components/Layout';
import { AppDataProvider } from './Utils/CreateContext';
import TeacherSchedule from './Components/TeacherSchedule';
import CourseModel from './Components/CourseModel';
import StudentNavbar from './Components/Student Pages/StudentNavbar';
import StudentProfile from './Components/Student Pages/StudentProfile';
import NewLayout from './Components/Student Pages/NewLayout';
import MyCourses from './Components/Student Pages/MyCourses';
import MyIcons from './Components/Student Pages/lucid';
import AssignmentPreview from './Components/Student Pages/AssignmentPreview';
import SubmitAssign from './Utils/SubmitAssign';
import AssgPreview from './Utils/AssgPreview';
import Exam from './Components/Exam';
import Logout from './Components/Logout';
function App() {
  return (
    <div className="App">
      <Router>
        <FormProvider>
          <AppDataProvider>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/icon' element={<MyIcons />} />
            <Route path='/today-schedule' element={<TodaysSchedule />} />
            <Route path='/register' element={<Register />} />
            <Route path='/emailVerificaion' element={<EmailVerificaion />} />
            <Route element={<StudentProtectedRoute/>}>
                <Route path='/home' element={<Home />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/today's/schedule" element={<TeacherSchedule />} />
              {/* <Route path='/test2' element={<Test2 />} /> */}
              <Route path='/teacher/classroom' element={<ClassRoomMain />} />
            </Route>

            <Route element={<NewLayout />}>
              <Route path='/student/today-schedule' element={<TodaysSchedule />} />
              <Route path="/teacher/todays/schedule" element={<TeacherSchedule />} />
              <Route path='/test2' element={<Test2 />} />
              <Route path='/student/exam/details' element={<Exam />} />
              <Route path='/student/profile' element={<StudentProfile />} />
              <Route path='/student/dashboard' element={<Dashboard />} />
              <Route path='/student/enrolled/courses' element={<MyCourses />} />
              <Route path='/student/preview/assignment' element={<AssignmentPreview />} />
              <Route path='/assignment/:department/:courseID/:assgID/submit' element={<AssgPreview />} />

            </Route>


              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/motion' element={<Motion />} />
              <Route path='/atten' element={<Attendence />} />
              <Route path='/key' element={<Key />} />
              <Route path='/lucide' element={<MyIcons />} />
              <Route path='/check-ct-info' element={<CtMarkPreCheck/>}/>
              {/* <Route path='/update-ct-mark' element={<UpdateCtMark/>}/> */}
              <Route path='/update-ct-mark/:department/:courseID/:testID' element={<UpdateCtMark/>}/>
            <Route path='/adminControl' element={<AdminControl />} />
            <Route path='/stn' element={<StudentNavbar />} />
            <Route path='/teacher/classroom/details' element={<Preview />} />
          </Routes>
          </AppDataProvider>
        </FormProvider>
      </Router>
    </div> 
  ); 
}

export default App;