import React, { useState, useEffect } from "react";
import axios from "axios";

import { AdminBase } from "./adminMain";

export function PendingRequests() {

    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin_eduapp/pending-requests').then((response) => {
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
                    </tr>
                </thead>
                <tbody>
                    {pendingRequests.map((requests, key) => {
                        console.log(requests.first_name);
                        return (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{requests.teacher_id.first_name + " " + requests.teacher_id.last_name}</td>
                                <td>{requests.teacher_id.email}</td>
                                <td>{requests.teacher_id.phone_number}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}