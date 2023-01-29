import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";
import { StudentNavbar } from "../Components/studentNavbar";
import './style.css'



export function Studenthome() {

    // const { firstname } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const { tokenrefresher } = useContext(AuthContext)
    const [courses, setCourses] = useState([])



    console.log(tokendetails);
    let verified1 = tokendetails.verified
    console.log(verified1);
    let check = tokendetails.datafilled

    const getstudentcourses = () => {
        axios.get('http://127.0.0.1:8000/student/student-courses/' + tokendetails?.user_id).then((response) => {
            console.log(response);
            setCourses(response.data)
        })
    }
    useEffect(() => {
        getstudentcourses()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("student form");
        const data = new FormData()
        data.append('profile_image', e.target.profile_picture.files[0])
        data.append('grade', e.target.grade.value)
        data.append('school_name', e.target.school_name.value)
        data.append('school_address', e.target.school_address.value)
        data.append('home_address', e.target.home_address.value)
        data.append('guardian', e.target.guardian.value)
        data.append('guardian_number', e.target.guardian_number.value)
        data.append('user_id', user.user.user_id)
        console.log(data);
        axios.post('http://127.0.0.1:8000/student/student-create', data).then((res) => {
            // console.log(res);
            tokenrefresher()
        })
    }

    return (
        <div>
            <NavBar></NavBar>
            <StudentNavbar></StudentNavbar>
            {
                check == false ?
                    <div>
                        <div className="container col-md-7">
                            <div className="card shadow my-5">
                                <div className="card-body">
                                    <p className="text-start h3">Enter your details</p>
                                    <hr />
                                    <form onSubmit={handleSubmit} >
                                        <div className="row container text-start">
                                            <div>
                                                <label htmlFor="">Upload your image</label>
                                                <input className="form-control" type="file" name="profile_picture"></input>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Class</label>
                                                <select className="form-control" name="grade" id="">
                                                    <option value="8th grade">8th Grade</option>
                                                    <option value="9th grade">9th Grade</option>
                                                    <option value="10th grade">10th Grade</option>
                                                    <option value="11th grade">11th Grade</option>
                                                    <option value="12th grade">12th Grade</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">School Name</label>
                                                <input className="form-control" type="text" name="school_name" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="">School Address</label>
                                                <input className="form-control" type="text" name="school_address" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="">Home Address</label>
                                                <input className="form-control" type="text" name="home_address" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Guardian's Name</label>
                                                <input className="form-control" type="text" name="guardian" />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="">Guardian's Number</label>
                                                <input className="form-control" type="text" name="guardian_number" />
                                            </div>

                                            {/* <input className="btn btn-primary mt-3" type="submit" /> */}

                                        </div>
                                        <button type="submit" className="btn btn-primary" >submit</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <div className="mt-4">
                            <Link to='/browse-courses'>
                                <button className="btn btn-primary">Browse Courses</button>
                            </Link>
                            {
                                courses.length !== 0 ?

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
                                                            <td>
                                                                <Link to={{ pathname: `/browse-courses/${cours.slug}`, state: { users: cours } }}>
                                                                    <button className="add-content">view</button>
                                                                </Link>
                                                            </td>
                                                        </tr>

                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        {/* <AddNewCourse funct={hello}></AddNewCourse> */}

                                    </div>

                                    : null
                            }
                        </div>
                    </div>
            }

        </div>
    )
}