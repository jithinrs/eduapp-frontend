import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";
import loginImage from '../staticImages/signin.jpg'



export function OtpLoginPage() {
    const [mobile, setMobile] = useState('')

    const { Otploginphone } = useContext(AuthContext)
    const { otpsubmit } = useContext(AuthContext)
    const { otpstatus } = useContext(AuthContext)


    const navigate = useNavigate()
    return (
        <div>
            {otpstatus === 'no' ?
                // <div>
                //     <form onSubmit={Otploginphone}>
                //         <label htmlFor="">Phone number</label>
                //         <input type="text" name="mobile" />
                //         <input type="submit" />
                //     </form>
                // </div>
                <div className="row register-maindiv">
                    <div className="col">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="col">
                        
                        <form onSubmit={Otploginphone}>
                            <label htmlFor="">Phone number</label>
                            <input className="form-control" type="text" name="mobile" />
                            <input className="btn btn-primary mt-3" type="submit" />
                        </form>

                       
                    </div>

                </div>
                :
                <div className="row register-maindiv">
                    <div className="col">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="col">
                        <form onSubmit={otpsubmit}>
                            <label htmlFor="">otp</label>
                            <input className="form-control" type="text" name="otp" />
                            <input className="btn btn-primary mt-3" type="submit" />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}