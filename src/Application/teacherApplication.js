import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import './style.css'
import { NavBar } from "../Components/navBar";
import AuthContext from "../context/authcontext";




export function TeacherApplication() {

    // const [testname ,settestname] = useState('')

    // const handletest = (e) => {
    //     settestname(e.target.value)
    // }
    const {isAdmin} = useContext(AuthContext)
    const navigate = useNavigate()
    const {userEmail} = useContext(AuthContext)
    const {user} = useContext(AuthContext)
    const {firstname} = useContext(AuthContext)
    const {userRole, setuserRole} = useContext(AuthContext)


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(testname)
        let first_name = e.target.first_name.value
        let last_name = e.target.last_name.value
        let date_of_birth = e.target.date_of_birth.value
        let gender = e.target.gender.value
        let phone_number = e.target.phone_number.value
        let email = e.target.email.value
        let home_address = e.target.home_address.value
        console.log(userEmail);
        console.log(isAdmin);
        console.log(user);
        if (false) {

        } else {
            axios.post('http://127.0.0.1:8000/teacher/teacher-apply', {
                user_id : user.user.user_id,
                first_name : first_name,
                last_name : last_name,
                date_of_birth : date_of_birth,
                gender : gender,
                phone_number : phone_number,
                email : email,
                home_address : home_address,
            }).then ((response)=> {
                console.log(response);
                if(response.data.message === "success"){
                    if(response.data.user_role === true){
                        console.log("pani varunnund");
                        setuserRole("teacher")
                        localStorage.setItem('role', JSON.stringify('teacher'))

                    }
                    // navigate('/')
                }
                console.log(response.data.message);
            })
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container col-md-7">
                <div className="card shadow my-5">
                    <div className="card-body">
                        <p className="text-start h3">Enter your details</p>
                        <hr />
                        <form onSubmit={handleSubmit} >
                            <div className="row container text-start">

                                <div className="col-md-6">
                                    <label htmlFor="">First Name</label>
                                    <input className="form-control" type="text" name="first_name" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="">Last Name</label>
                                    <input className="form-control" type="text" name="last_name" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="">Date of Birth</label>
                                    <input className="form-control" type="date" name="date_of_birth" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="">Gender</label>
                                    <select className="form-control" name="gender" id="">
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Phone Number</label>
                                    <input className="form-control" type="number" name="phone_number" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Email</label>
                                    <input className="form-control" type="email" name="email" />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="">Home Address</label>
                                    <input className="form-control" type="text" name="home_address" />
                                </div>
                                

                                {/* <input className="btn btn-primary mt-3" type="submit" /> */}
                                <button type="submit" className="btn btn-primary" >submit</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}