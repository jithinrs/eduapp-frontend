import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import loginImage from '../staticImages/signin.jpg'
import { NavBar } from "../Components/navBar";
import './style.css'
import AuthContext from "../context/authcontext";
import { Snackbar, Button, IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';

export function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    let { loginuser } = useContext(AuthContext)
    let { loginsubmit } = useContext(AuthContext)

    let { open } = useContext(AuthContext)
    let { setOpen } = useContext(AuthContext)
    let { alertMessage } = useContext(AuthContext)

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                X
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
        </React.Fragment>
    );


    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError(true);
        } else {
            axios.post('http://127.0.0.1:8000/account/login', {
                email: email,
                password: password
            }).then((res) => {
                console.log(res.data.token.access);
                console.log("hello");
                localStorage.setItem("token", res.data.token.access)
                // navigate('/login')
            })

            // setSubmitted(true);
            // setError(false);
        }
    };
    // const successMessage = () => {
    //     return (
    //         <div
    //             className="success"
    //             style={{
    //                 display: submitted ? '' : 'none',
    //             }}>
    //             <h1>Usersuccessfully registered!!</h1>
    //         </div>
    //     );
    // };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h5>Please enter all the fields</h5>
            </div>
        );
    };

    return (
        <div>


            <div className="row register-maindiv">
                <div className="col">
                    <img src={loginImage} alt="" />
                </div>
                <div className="col">
                    <form onSubmit={loginsubmit}>
                        <label className="label">Email</label>
                        <input onChange={handleEmail} className="form-control"
                            value={email} type="email" name="email" />
                        <label className="label">Password</label>
                        <input onChange={handlePassword} className="form-control"
                            value={password} type="password" name="password" />
                        <div className="messages">
                            {errorMessage()}
                            {/* {successMessage()} */}
                        </div>
                        <div>
                            <input className="btn btn-primary mt-3" type="submit" />
                        </div>
                        {/* <button onClick={handleSubmit} className="btn btn-primary mt-3" type="submit">
                            Submit
                        </button> */}
                    </form>
                    <div>
                        <Link to='/otplogin'>Log in with OTP</Link>
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={alertMessage}
                        action={action}
                    />
                </div>

            </div>
        </div>
    )
}


// {
//     "email":"jithu@gmail.com"
//     "password":"podapatti"
//     }