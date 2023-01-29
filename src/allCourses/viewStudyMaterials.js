import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";


import { NavBar } from "../Components/navBar";
import { AddNewChapterForm } from "../uiElements/addNewChapterform";

export function ViewChapterMaterial() {

    const { newid, newid1 } = useParams()
    console.log(newid, newid1);
    const [materials, setMaterials] = useState([])
    const { authtokens } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)



    const hello = async () => {
        let response = await axios.get('http://127.0.0.1:8000/courses/chapter-view/' + newid1)
        console.log(response.data);
        setMaterials(response.data)
    }
    useEffect(() => {
        hello()
    }, [])

    const completeSubmit = (id) => (e) => {
        e.preventDefault()
        console.log("complete working?");
        console.log(id);
        axios.post('http://127.0.0.1:8000/courses/complete-material', { chapter: newid1, material_id: id },
            {
                headers: {
                    'Authorization': 'Bearer ' + String(authtokens?.token.access)
                }
            },

        ).then((response) => {
            console.log(response.data);
            hello()
        })
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="material-div-main">
                <div className="card shadow my-5">
                    <div className="card-body">
                        <p className="h3 text-start">Study Materials</p>
                        <hr />
                        <div className="accordion" id="accordionExample">

                            {materials.map((mat, key) => {

                                return (
                                    <div key={key} className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + "hello" + key + 1} aria-expanded="false" aria-controls="collapseOne">
                                                <strong>
                                                {
                                                    mat.user_id.includes(tokendetails.user_id)?
                                                    
                                                <span><span className="text-danger">&#10003;</span> {key + 1} {mat.file_description}</span>:<span>{key + 1} {mat.file_description}</span>
                                                }
                                                
                                                </strong>
                                            </button>
                                        </h2>
                                        <div id={"hello" + key + 1} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <a className="course-material-link bold" target="_blank" href={`http://127.0.0.1:8000/${mat.files}`}><strong>{mat.file_name}</strong></a>
                                                {
                                                    mat.user_id.includes(tokendetails.user_id)?
                                                    null:
                                                <button onClick={completeSubmit(mat.id)} className="btn btn-primary mx-4">completed</button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            }

                        </div>
                    </div>
                </div>
            </div>
            {/* <AddNewChapterForm slug = {id1} funct = {hello}></AddNewChapterForm> */}
        </div>
    )
}