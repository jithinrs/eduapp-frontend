import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './style.css'

import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";
import { TeacherNavbar } from "../Components/teacherNavbar";
import { AddNewCourse } from "../uiElements/addNewCourse";

export function CoursePage() {

    const { user } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    let id = user.user.user_id
    const[courses, setCourses] = useState([])

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/courses/teacher-course/'+id).then((response) => {
    //         console.log("podey");
    //         // setStudent(response.data)
    //         // setAlldubjects(response.data)
    //         console.log(response);
    //         setCourses(response.data)
    //     })

    // }, [])

    const hello = async () => {
        let response = await axios.get('http://127.0.0.1:8000/courses/teacher-course/'+id)
        setCourses(response.data)
    }

    useEffect(() => {
        hello()
    },[])

    return (
        <div>
            <TeacherNavbar></TeacherNavbar>
            <div className="container ">
            <h1>
                Courses
            </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope='col'>Subject</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((cours, key) => {
                        // console.log(cours.title);
                        return (

                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{cours.subject_id}</td>
                                <td>{cours.grade}</td>
                                <td>₹ {cours.price}</td>
                                <td>
                                    <Link to={{pathname:`/course-page/${cours.slug}`,state: { users: cours }}}>
                                        <button className="add-content">view</button>
                                    </Link>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            <AddNewCourse funct = {hello}></AddNewCourse>

            </div>
        </div>
    )
}