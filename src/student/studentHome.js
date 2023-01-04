import React, { useContext } from "react";
import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";
import { StudentNavbar } from "../Components/studentNavbar";
import './style.css'



export function Studenthome() {

    // const { firstname } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    console.log(tokendetails);
    let verified1 = tokendetails.verified
    console.log(verified1);

    return (
        <div>
            <NavBar></NavBar>
            <StudentNavbar></StudentNavbar>
            {
                
            }
            
        </div>
    )
}