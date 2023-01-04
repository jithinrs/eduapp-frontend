import AuthContext from "../context/authcontext";
import React, { useContext } from "react";

import { NavBar } from "./navBar";


export function TeacherNavbar() {

    const { firstname } = useContext(AuthContext)

    return(
        <div>
            <NavBar></NavBar>
            
            <div className="teacher-navbar  d-flex align-items-end">
                <div className="container">
                    <div>
                        <h2 className="text-start">Hi, {firstname}</h2>
                    </div>
                    <div className="navbar-elements mb-3">
                        <h6>Home</h6>
                        <h6>Students</h6>
                        <h6>Edit Profile</h6>
                    </div>

                </div>
            </div>
        </div>
    )
}