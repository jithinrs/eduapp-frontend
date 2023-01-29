import React, { useContext, useEffect, useState } from "react";
import './style.css'
import eduapp from '../staticImages/eduapp.png'
import { Link } from 'react-router-dom'
import AuthContext from "../context/authcontext";
import axios from "axios";

export function NavBar() {
    let { firstname } = useContext(AuthContext)
    let { logoutUser } = useContext(AuthContext)
    let { tokendetails } = useContext(AuthContext)
    let { authtokens } = useContext(AuthContext)

    const [notifications, getNotifications] = useState([])

    const notificationBar = () => {

        axios.get('http://127.0.0.1:8000/courses/student-notification',
            {
                headers: {
                    'Authorization': 'Bearer ' + String(authtokens?.token.access)
                }
            },

        ).then((response) => {
            console.log(response.data);
            getNotifications(response.data)
        })
    }
    useEffect(() => {
        notificationBar()
    }, [])
    // console.log(tokendetails);
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

                    {
                        tokendetails.Roles == "S" ?
                            <div>
                                <div className="nav-item dropdown">

                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa-solid fa-bell"></i></a>
                                    <div className="dropdown-menu" >
                                        {
                                            notifications.map((notif, key) => {
                                                return (
                                                    <p className="ms-2">{notif.teacher_name} has added a new chapter
                                                        <Link className="text-decoration-none" to={{ pathname: `/browse-courses/${notif.course_slug}/${notif.slug}` }}>
                                                            <strong className="mx-1 text-dark ">{notif.chapter_name}</strong>
                                                        </Link>
                                                        to the course {notif.course_name}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div> : null
                    }
                    <div className="login-button">
                        {tokendetails.Roles == "S" ?
                            <Link to='/student-home'>
                                <button>{`hi ${firstname}`}</button>
                            </Link>
                            :
                            <Link to='/teacher-home'>

                                <button>{`hi ${firstname}`}</button>
                            </Link>
                        }
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