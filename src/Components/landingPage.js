import React, { useContext } from "react";
import { NavBar } from './navBar'
import './style.css'

import AuthContext from "../context/authcontext";
import { Nonlanding } from "./nonredlandingpage";
import { TeacherHome } from "../Teacher/teacherHome";
import { Studenthome } from "../student/studentHome";

// import { Link, Outlet } from "react-router-dom";
export function LandingPage() {
    
//   let {userRole} = useContext(AuthContext)
  let {tokendetails} = useContext(AuthContext)
  console.log(tokendetails);

  let userRole = ""
  tokendetails? userRole = tokendetails.Roles : userRole = null
  console.log(userRole);
    return (
        <div>
            <NavBar></NavBar>
            <div className="space-after-nav"></div>
            <Nonlanding></Nonlanding>
           
        </div>
    )
}