import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AdminBase } from "./adminMain";

export function PendingRequests() {

    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin_eduapp/teachers-list').then((response) => {
            console.log(response.data);
            setPendingRequests(response.data)
        })

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
                        <th scope ="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingRequests.map((person, key) => {
                        return (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{person.get_teacher_name}</td>
                                <td>{person.get_teacher_email}</td>
                                <td>{person.get_teacher_mobile}</td>
                                {/* {let test = "hello"} */}
                                <td>
                                    <Link to={{pathname:`/admint/check-pending-requests/${person.user_id}`,state: { users: person }}}><button>test</button></Link>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}