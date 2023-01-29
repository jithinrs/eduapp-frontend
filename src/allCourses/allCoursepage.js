import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";


export function AllCoursePage() {


    const [courses, setCourses] = useState([])
    const [subject, setSubject] = useState([])

    const { user } = useContext(AuthContext)
    const { BASE_URL } = useContext(AuthContext)
    console.log(user);
    let user_id = user.user.user_id

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/courses/all-course/' + user_id, { user: user.user.user_id }).then((response) => {
            console.log("podey");
            // setStudent(response.data)
            // setAlldubjects(response.data)
            console.log(response);
            setCourses(response.data)
            // console?.log(courses);
            console.log("poday test");
        })
        axios.get('http://127.0.0.1:8000/courses/all-subjects').then((response1) => {
            console.log(response1);
            setSubject(response1.data)

        })

    }, [])

    const subjectFilter = (e) => {
        // e.preventDefault()
        console.log(e);
        axios.post('http://127.0.0.1:8000/courses/all-course/' + user_id, { subject: e }).then((response) => {
            console.log("podey");
            // setStudent(response.data)
            // setAlldubjects(response.data)
            console.log(response);
            setCourses(response.data)
            // console?.log(courses);
            console.log("poday test");
        })
        // axios.
    }
    
    return (
        <div>
            <NavBar></NavBar>
            <h1>
                All Courses
            </h1>
            <div>
                <div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            SelectSubject
                        </button>
                        <ul className="dropdown-menu">
                            <form>
                                {
                                    subject.map((sub, key) => {
                                        return (

                                            <li key={key}><a onClick={() => subjectFilter(sub.title)} className="dropdown-item" href="#">{sub.title}</a></li>
                                        )
                                    })
                                }
                            </form>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container col-md-7">
                <div className="card shadow my-5">
                    <div className="card-body">
                        <div className="row container text-start d-flex justify-content-around">
                            {/* <div className="col-md-6"> */}
                            {
                                courses.map((cours, key) => {
                                    // console.log(cours.title);
                                    return (

                                        <div key={key} className="card" style={{ width: "14rem" }}>
                                            <img src={BASE_URL + cours.image} className="mt-2 card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{cours.grade}</h5>
                                                <p className="card-text">{cours.subject_id}</p>
                                                <Link to={{ pathname: `/browse-courses/${cours.slug}`, state: { users: cours } }}>

                                                    <button className="btn btn-primary">See details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}