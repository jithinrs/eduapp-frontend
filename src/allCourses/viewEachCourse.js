import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { NavBar } from "../Components/navBar";
import { ModalForm } from "../uiElements/modalForm";
import AuthContext from "../context/authcontext";

import { TeacherNavbar } from "../Components/teacherNavbar";
import { YourComponent } from "./coursepayment";

import './style.css'

export function ViewEachCourse(props) {
    const { newid } = useParams()
    const { authtokens } = useContext(AuthContext)

    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(newid);

    const hello = async () => {
        setLoading(false)
        let response = await fetch('http://127.0.0.1:8000/courses/show-each-course/' + newid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authtokens?.token.access)
            }
        })
        let data = await response.json()
        console.log(data);
        setLoading(true)
        setChapters(data)
    }

    useEffect(() => {
        hello()
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    let join_status = chapters[0]?.course_joined !== "joined"?"no":"yes"
    console.log(join_status);

    return (
        <div>
            <NavBar></NavBar>
            <div className="container ">
                <h1>
                    Courses
                </h1>
                {loading == false ?
                    <div className="d-flex justify-content-center  mt-5">
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        <h1 className="text-primary">Loading</h1>
                    </div>
                    : chapters[0]?.course_joined !== "joined" ?
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope='col'>Chapter name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapters.map((chap, key) => {
                                        return (
                                            key == 0 ?
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{chap.chapter_name}</td>
                                                    <td>
                                                        <Link to={{ pathname: `/browse-courses/${newid}/${chap.slug}`, state: { users: chap } }}>
                                                            <button className="add-content">view</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                :
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{chap.chapter_name}</td>
                                                    <td>

                                                        <button disabled className="add-content">view <i className="fa-solid fa-lock"></i></button>

                                                    </td>
                                                </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div>
                                {/* <button className="btn btn-primary">Add new Chapter</button> */}
                                {/* <FormDialog></FormDialog> */}
                                {/* <ModalForm courseid={newid} funct={hello}></ModalForm> */}
                                <form onSubmit={handleSubmit} action="">
                                    {/* <button type="submit" className="btn btn-primary">Purchase this course</button> */}
                                    <div className="paypal-div">
                                        <p className="h4">Purchase this course</p>
                                        <YourComponent courseid = {newid} funct = {hello}></YourComponent>
                                    </div>
                                </form>
                            </div>
                        </div> : <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope='col'>Chapter name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapters.map((chap, key) => {
                                        return (
                                            
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{chap.chapter_name}</td>
                                                    <td>
                                                        <Link to={{ pathname: `/browse-courses/${newid}/${chap.slug}`, state: { users: chap } }}>
                                                            <button className="add-content">view</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                
                                               
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div>
                                {/* <button className="btn btn-primary">Add new Chapter</button> */}
                                {/* <FormDialog></FormDialog> */}
                                {/* <ModalForm courseid={newid} funct={hello}></ModalForm> */}
                                <form onSubmit={handleSubmit} action="">
                                    {/* <button type="submit" className="btn btn-primary">Purchase this course</button> */}
                                    
                                </form>
                            </div>
                        </div>

                }
            </div>
        </div>
    )
}