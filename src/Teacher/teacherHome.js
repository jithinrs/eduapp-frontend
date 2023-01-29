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
    const [userdetails, getUserDetails] = useState()

    const { firstname } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const { authtokens } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    const { tokenrefresher } = useContext(AuthContext)

    // console.log(tokendetails);
    let check = tokendetails.datafilled
    let checkdata = tokendetails.verified
    // console.log((authtokens.token.access));


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

    const getteacherdetails = async () => {
        let response = await fetch('http://127.0.0.1:8000/teacher/get-each-teacher', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authtokens?.token.access)
            }
        })
        console.log(authtokens.token.access);
        let data = await response.json()
        console.log(data);
        getUserDetails(data)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/courses/all-subjects').then((response) => {
            setAlldubjects(response.data)
            // console.log(response.data);
            // let hello = response.data
            // hello.map((title)=> {
            //     console.log(title.title);
            // })
            // console.log('test');
            getteacherdetails()
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
        axios.post('http://127.0.0.1:8000/courses/create-course', data).then((res) => {
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
                        <div className="container ">
                            <div className="card shadow my-5">
                                <div className="card-body teacher-div">
                                    <div className="teacher-image ">
                                        <img className="rounded-circle" width={"250px"} src={`http://127.0.0.1:8000${userdetails?.profile_image}`} alt="" />
                                        <p className="h5 text-capitalize">{userdetails?.get_teacher_name}</p>
                                    </div>
                                    <div className="teacher-phone-email">
                                            <p><span className="h6">Email: </span>{userdetails?.get_teacher_email}</p>
                                            <p><span className="h6">Mobile No: </span>{userdetails?.get_teacher_mobile}</p>
                                    </div>
                                    <div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}