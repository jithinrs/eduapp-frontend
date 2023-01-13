import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ModalForm } from "../uiElements/modalForm";

import { TeacherNavbar } from "../Components/teacherNavbar";

export function EachCourse(props) {
    const { id } = useParams()
    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)

    const hello = async () => {
        setLoading(false)
        let response = await axios.get('http://127.0.0.1:8000/courses/each-course/' + id)
        console.log(response.data);
        setLoading(true)
        setChapters(response.data)
    }

    useEffect(() => {
        hello()
    }, [])

    return (
        <div>
            <TeacherNavbar></TeacherNavbar>
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
                    :
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
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{chap.chapter_name}</td>
                                            <td>
                                                <Link to={{ pathname: `/course-page/${id}/${chap.slug}`, state: { users: chap } }}>
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
                            <ModalForm courseid={id} funct={hello}></ModalForm>
                        </div>
                    </div>
                    
                }
            </div>
        </div>
    )
}