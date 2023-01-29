import React, { useState, useEffect } from "react";
import axios from "axios";

import { AdminBase } from "./adminMain";

export function Adminteacher() {

    const [teacher, setTeacher] = useState([])



    const blockUnblockUser = async (id) => {
        let response = await fetch('http://127.0.0.1:8000/admin_eduapp/block-unblock/'+id , {
            method:'POST'
        })
        var closebtn = document.getElementById('blockbutton'+id)
        var closebtn1 = document.getElementById('unblockbutton'+id)
        closebtn.click()
        closebtn1.click()
        getStudentList()
    }

    const getStudentList = async () =>{
        let response = await fetch('http://127.0.0.1:8000/admin_eduapp/teachers-list', {
            method:'GET'
        })
        let data = await response.json()
        console.log(data);
        setTeacher(data)
    }

    useEffect(() => {
       getStudentList()

    }, [])

    return (
        <div>
            <AdminBase></AdminBase>
            <div className="space-after-nav">

            </div>


            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.map((person, key) => {
                        
                        return (

                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{person.get_teacher_name}</td>
                                <td>{person.get_teacher_email}</td>
                                <td>{person.get_teacher_mobile}</td>
                                <td>
                                    {
                                        person.verified_or_not ?
                                            <div>
                                                <button type="button" style={{ width: "100px" }} className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#Blockuser" + person.user_id}>
                                                    Block
                                                </button>

                                            </div>

                                            :
                                            <button type="button" style={{ width: "100px" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#Unblockuser" + person.user_id}>
                                                Unblock
                                            </button>
                                    }

                                    <div className="modal fade" id={"Blockuser" + person.user_id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Block</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Do you want to block the user <strong>{person.fullname}</strong>?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" id={"blockbutton" + person.user_id} className="btn btn-secondary tester" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" onClick={() => blockUnblockUser(person.user_id)} className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal fade" id={"Unblockuser" + person.user_id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Do you want to unblock the user <strong>{person.fullname}</strong>?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" id={"unblockbutton" + person.user_id} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" onClick={() => blockUnblockUser(person.user_id)} className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}