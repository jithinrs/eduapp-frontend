import React, { useState, useEffect } from "react";
import axios from "axios";

import { AdminBase } from "./adminMain";

export function Adminteacher() {

    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin_eduapp/teachers_list').then((response) => {
            console.log(response.data);
            setTeacher(response.data)
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
                    {teacher.map((person, key) => {
                        console.log(person.first_name);
                        return (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{person.first_name + " " + person.last_name}</td>
                                <td>{person.email}</td>
                                <td>{person.phone_number}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}