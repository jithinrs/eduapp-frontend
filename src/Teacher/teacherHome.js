import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
// import { NavBar } from "../Components/navBar";
import './style.css'
import { TeacherNavbar } from "../Components/teacherNavbar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';





export function TeacherHome() {

    const [allsubjects, setAlldubjects] = useState([])
    const [selSubject, setSelSubjects] = useState([])

    const { firstname } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    const { tokenrefresher } = useContext(AuthContext)

    // console.log(tokendetails);
    let check = tokendetails.datafilled
    let checkdata = tokendetails.verified
    console.log((tokendetails));
    console.log(check);

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
        selSubject.map((sub) => {

        })
    };

    const handlesubject = (e) => {
        let value = e.target.value
        setSelSubjects([...selSubject, value])
        console.log(selSubject);

    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/courses/all-subjects').then((response) => {
            setAlldubjects(response.data)
        })

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("??");
        const data = new FormData()
        data.append('profile_image', e.target.profile_picture.files[0])
        data.append('certificate', e.target.certificate.files[0])
        data.append('home_address', e.target.home_address.value)
        data.append('user_id', user.user.user_id)
        data.append('subject', selSubject)
        console.log(data);
        axios.post('http://127.0.0.1:8000/teacher/teacher-create', data).then((res) => {
            tokenrefresher()
        })
    }

    const courseSubmit = (e) => {
        e.preventDefault()
        console.log("course func");
        const data = new FormData()
        data.append('user_id', user.user.user_id)
        data.append('image', e.target.image.files[0])
        data.append('subject_id', e.target.subject.value)
        data.append('grade', e.target.grade.value)
        // data.append('title', e.target.title.value)
        data.append('course_description', e.target.course_description.value)

        console.log(data);
        axios.post('http://127.0.0.1:8000/courses/create-course',data).then((res) => {
            console.log(res);
        })

    }

    return (
        <div>
            <TeacherNavbar></TeacherNavbar>
            {check == false ?
                <div>
                    <div className="container ">
                        <div className="card shadow my-5">
                            <div className="card-body">
                                <p className="h3 text-start">Upload your Credentials</p>
                                <form className="text-start" action="" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="">Upload your image</label>
                                        <input className="form-control" type="file" name="profile_picture"></input>
                                    </div>
                                    <div>
                                        <label htmlFor="">Upload your certificate</label>
                                        <input className="form-control" type="file" name="certificate"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">Subject</label>
                                        <Stack direction="row" spacing={1}>
                                            {
                                                selSubject.map((subject, key) => {
                                                    return (
                                                        <Chip label={subject} key={key} onDelete={handleDelete} />
                                                    )
                                                })
                                            }
                                        </Stack>
                                        <select onChange={handlesubject} className="form-control" name="gender" id="">
                                            {
                                                allsubjects.map((subject, key) => {
                                                    return (

                                                        <option key={subject.title} value={subject.title}>{subject.title}</option>


                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="">Home Address</label>
                                        <input className="form-control" type="text" name="home_address" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div> : checkdata == false ?
                    <div>
                        <h2>Your data is under verification</h2>
                    </div> :
                    <div>
                        test
                    </div>
            }
        </div>
    )
}