import React, { useContext } from "react";
import './style.css'
import eduapp from '../staticImages/eduapp.png'
import { Link } from 'react-router-dom'
import AuthContext from "../context/authcontext";

export function NavBar() {
    let { firstname } = useContext(AuthContext)
    let { logoutUser } = useContext(AuthContext)
    return (
        <div className="container d-flex justify-content-between">
            <div className="eduapp-logo">
                <img src={eduapp} alt="" />
            </div>

            <div className="nav-list">
                <Link to='/'>Home</Link>
                <Link>Courses</Link>
                <Link>Contact Us</Link>
                <Link to='/admint'>Admin</Link>
                <Link to='coursedetails'>coursedetails</Link>
            </div>

            {firstname
                ? <div className="register-login d-flex justify-content-between gap-3 align-items-center">
                    
                    <div className="login-button">
                        
                            <button>{`hi ${firstname}`}</button>
                        
                    </div>
                    <div className="register-button">
                        
                            <button onClick={logoutUser}>Log out</button>
                        
                    </div>
                </div>
                : <div className="register-login d-flex justify-content-between gap-3 align-items-center">

                    <div className="login-button">
                        <Link to='login'>
                            <button>Sign In</button>
                        </Link>
                    </div>
                    <div className="register-button">
                        <Link to='/register'>
                            <button>Sign Up</button>
                        </Link>
                    </div>

                </div>}
        </div>
    )
}