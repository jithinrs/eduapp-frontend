import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { AdminBase } from "./adminMain";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

import AuthContext from "../context/authcontext";



export function CheckPendingRequests(props) {
    const [teacher, setTeacher] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    // let user_id = id


    console.log(id);
    useEffect(() => {
        axios?.get('http://127.0.0.1:8000/admin_eduapp/teachers-pending/' + id).then((response) => {
            console.log(response.data);
            setTeacher(response.data)
        })

    }, [])
    let profile_image = 'http://127.0.0.1:8000/' + teacher.profile_image
    let certificate = 'http://127.0.0.1:8000/' + teacher.certificate
    let subArray = teacher.subject
    console.log(subArray);

    const handleAccept = (e) => {
        e.preventDefault()
        console.log("accept");
        let verify = "accept"
        axios.post('http://127.0.0.1:8000/admin_eduapp/teachervalidation', {verify : verify, user_id : id}).then((response) => {
            console.log(response);
            navigate('/admint/pending-requests')
        })
    }

    const handleDecline = (e) => {
        e.preventDefault()
        console.log("accept");
        let verify = "decline"
        axios.post('http://127.0.0.1:8000/admin_eduapp/teachervalidation', {verify : verify, user_id : id}).then((response) => {
            console.log(response);
        })
    }

    return (
        <div>
            <AdminBase></AdminBase>
            <div className="container col-md-10">
                <div className="card shadow my-5">
                    <div className="card-body">
                        <h1 className="text-start">{teacher.get_teacher_name}</h1>
                        <div className="col-md-12 d-flex justify-content-start">
                            <img src={profile_image} width='240px' alt="hell" />
                        </div>
                        <div className="col-md-12">
                            <h3 className="text-start">Home Address</h3>
                            <h4 className="text-start">{teacher.home_address}</h4>
                        </div>
                        <br />
                        <div className="col-md-6 d-flex justify-content-start align-items-center">
                            <h3>Email: </h3>
                            <h5>{teacher.get_teacher_email}</h5>
                        </div>
                        <div className="col-md-6 d-flex justify-content-start align-items-center">
                            <h3>Contact Number: </h3>
                            <h5>{teacher.get_teacher_mobile}</h5>
                        </div>
                        {/* <div className="col-md-6 d-flex justify-content-start align-items-center">
                            <h3>Subjects: </h3>
                            
                                {
                                    subArray.map((sub) => {
                                        return(
                                            <h5>
                                               &nbsp; {sub} &nbsp;

                                            </h5>
                                        )
                                    })
                                    // subArray
                                }
                            
                        </div> */}

                        <div className="col-md-6 d-flex justify-content-start align-items-center">
                            <button><a target="_blank" href={certificate}>hit</a></button>
                        </div>
                        <br />
                        <div className="col-md-6 d-flex justify-content-start align-items-center">

                        <form onSubmit={handleAccept}>
                            <button type="submit" className="btn btn-primary" >submit</button>
                        </form> &nbsp;
                        <form onSubmit={handleDecline}>
                            <button type="submit" className="btn btn-danger" >decline</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}