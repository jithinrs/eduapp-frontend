import React from "react";
import './style.css'
import eduapp from '../staticImages/eduapp.png'
import { Link, Outlet } from "react-router-dom";

export function AdminBase() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                <img className="admin-logo" src={eduapp} alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {/* <li className="nav-item">
                                <Link to='/admint/admin-dashboard' className="nav-link active text-dark">Dashboard</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link to='/admint/admin-teacher' className="nav-link active text-dark">Teacher</Link>

                            </li>
                            {/* <Outlet/> */}
                            <li className="nav-item">
                                <Link to ='/admint/admin-student' className="nav-link active text-dark">Student</Link>

                            </li>
                            <li className="nav-item">
                                <Link to ='/admint/admin-subjects' className="nav-link active text-dark">Subjects</Link>

                            </li>
                            <li className="nav-item">
                                <Link to='/admint/pending-requests' className="nav-link active text-dark">Pending requests</Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </div>
    )
}