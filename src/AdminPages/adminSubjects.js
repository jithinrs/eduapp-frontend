import React ,{useContext, useEffect, useState} from "react";
import AuthContext from "../context/authcontext";


import { AdminBase } from "./adminMain";

export function Adminsubjects() {

    const { authtokens } = useContext(AuthContext)
    const [subjects, setSubjects] = useState([])

    const getSubjects = async () => {
        let response =  await fetch('http://127.0.0.1:8000/admin_eduapp/get-all-subjects', {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authtokens?.token.access)
            }
        })
        let data = await response.json()
        console.log(data);
        setSubjects(data)
    }
    useEffect(() => {
        getSubjects()
    },[])

    return (
        <div>
            <AdminBase></AdminBase>
            <h1>subject</h1>
            {
                subjects.map((sub,key)=> {
                    return(
                        <div key={key}>
                            
                            <button type="button" className="btn btn-outline-danger" disabled>{sub.title}</button>
                            <br />
                            <br />
                        </div>
                    )
                })
            }


        </div>
    )
}