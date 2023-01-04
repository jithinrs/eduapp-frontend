import './App.css';
// import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authcontext'

import { PrivateRoute, AdminRoute } from './utils/privateRoute';
import { StudentRoute } from './utils/privateRoute';
import { TeacherRoute } from './utils/privateRoute';

import { LandingPage } from './Components/landingPage'
import { Loginpage } from './Authentications/loginpage'
import { OtpLoginPage } from './Authentications/otplogin';
import { Registerpage } from './Authentications/registerPage'

import { StudentApplication } from './Application/studentApllication';
import { TeacherApplication } from './Application/teacherApplication';


import { TeacherHome } from './Teacher/teacherHome';

import { Studenthome } from './student/studentHome';

import { Admindashboard } from './AdminPages/adminDashboard';
import { Adminteacher } from './AdminPages/adminTeacher';
import { Adminstudent } from './AdminPages/adminStudent';
import { Adminsubjects } from './AdminPages/adminSubjects';
import { PendingRequests } from './AdminPages/pendingrequest';
import { CheckPendingRequests } from './AdminPages/checkPendingRequests';

import NotLoggedIn from './utils/NotLoggedIn';
import LoggedIn from './utils/LoggedIn';
// import { AdminBase } from './AdminPages/adminMain';

function App() {


  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            {/* <Route path='/' element={<LandingPage />} /> */}

            <Route path='otplogin' element={<OtpLoginPage />} />


            <Route path="/register" element={<Registerpage />} />
            <Route element={<PrivateRoute />} >
              <Route path='/' element={<LandingPage />} />
              <Route path="coursedetails" element={<div>coursedetails</div>} />
              <Route path='student-enroll' element={<StudentApplication />} />
              <Route path='teacher-apply' element={<TeacherApplication />} />
            </Route>

            <Route element = {<StudentRoute />} >
              <Route path='student-home' element = {<Studenthome />} />
            </Route>


            <Route element = {<TeacherRoute/>}>
              <Route path = 'teacher-home' element={<TeacherHome />} />
            </Route>



            {/* <Route path='/admin-dashboard' element={<Admindashboard />} /> */}

            <Route path='admint' element={<AdminRoute />} >
              <Route index element={<Admindashboard />} />
              <Route path='admin-teacher' element={<Adminteacher />} />
              <Route path='admin-student' element={<Adminstudent />} />
              <Route path='admin-subjects' element={<Adminsubjects />} />
              <Route path='pending-requests' element={<PendingRequests />} />
              <Route path='check-pending-requests/:id' element={<CheckPendingRequests />}/>
              <Route path='admin-subjects/test' element={<h1>hello</h1>} />
            </Route>

            <Route path="login" element={<Loginpage />} />

          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
