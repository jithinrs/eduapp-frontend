import React, { useContext } from "react";
import AuthContext from "../context/authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
// import { NavBar } from "../Components/navBar";
import './style.css'



export function TeacherHome() {

    const { firstname } = useContext(AuthContext)
    const {user} = useContext(AuthContext)


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("??");
        const data = new FormData()
        data.append('profile_picture', e.target.profile_picture.files[0])
        data.append('certificate', e.target.certificate.files[0])
        data.append('teacher_id', user.user.user_id)
        data.append('teacher_name', firstname)
        console.log(data);
        axios.post('http://127.0.0.1:8000/teacher/credentials', data).then((res) => {
            console.log(res);
        })
    }

    return (
        <div>
            <div className="teacher-navbar  d-flex align-items-end">
                <div className="container">
                    <div>
                        <h2 className="text-start">Hi, {firstname}</h2>
                    </div>
                    <div className="navbar-elements mb-3">
                        <h6>Home</h6>
                        <h6>Students</h6>
                        <h6>Edit Profile</h6>
                    </div>

                </div>
            </div>
            <div>
                <div className="container ">
                    <div className="card shadow my-5">
                        <div className="card-body">
                            <p className="h3 text-start">Upload your Credentials</p>
                                <form className="text-start" action="" onSubmit={handleSubmit}>
                                    <div>
                                        <label  htmlFor="">Upload your image</label>
                                        <input className="form-control" type="file" name="profile_picture"></input>
                                    </div>
                                    <div>
                                        <label htmlFor="">Upload your certificate</label>
                                        <input className="form-control" type="file" name="certificate"></input>
                                    </div>
                                <button type="submit" className="btn btn-primary" >submit</button>

                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}