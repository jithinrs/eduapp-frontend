import AuthContext from "../context/authcontext";
import React, { useContext } from "react";



export function StudentNavbar() {
    const { firstname } = useContext(AuthContext)

    return(
        <div>
            <div className="teacher-navbar  d-flex align-items-end">
                <div className="container">
                    <div>
                        <h2 className="text-start">Hi, {firstname}</h2>
                    </div>
                    <div className="navbar-elements mb-3">
                        <h6>My classes</h6>
                        <h6>Saved Notes</h6>
                        <h6>Edit Profile</h6>
                    </div>

                </div>
            </div>
        </div>
    )
}