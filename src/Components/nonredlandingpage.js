import React, { useEffect } from "react";

import './style.css'
import learning from '../staticImages/learning.jpg'
import teaching from '../staticImages/teaching.webp'
import { Link } from "react-router-dom";


export function Nonlanding() {


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="landing-heading1">
                            Are you looking for a place to learn?
                        </div>
                        <div className="landing-description1">
                            We provide a platform for every student to find an educator of their choice on the subject you want to focus. We have more than 1000 teachers focusing on more than 50 subjects on all fields.
                        </div>
                        <div className="landing-button-div1 d-flex justify-content-start">
                            <Link to={'/student-enroll'}>
                                <button className="landing-button">Enroll</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <img src={learning} alt="" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div>
                            <img className="landing-image" src={teaching} alt="" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="landing-heading2">
                            Are you looking for a place to teach?
                        </div>
                        <div className="landing-description2">
                            We provide a platform for every person who wants to take teaching as a profession. Hope on to our website and apply.
                            Upload your credentials and you can start creating contents as soon as our admin panel verifies it.
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link to={'/teacher-apply'}>
                                <button className="landing-button">Apply</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}