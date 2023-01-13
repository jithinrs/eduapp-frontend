import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { NavBar } from "../Components/navBar";
import { AddNewChapterForm } from "../uiElements/addNewChapterform";

export function ViewChapterMaterial() {

    const { newid,newid1 } = useParams()
    console.log(newid,newid1);
    const [materials, setMaterials] = useState([])

    const hello = async () => {
        let response = await axios.get('http://127.0.0.1:8000/courses/chapter-view/' + newid1)
        console.log(response.data);
        setMaterials(response.data)
    }
    useEffect(() => {
        hello()
    }, [])


    return (
        <div>
            <NavBar></NavBar>
            <div className="material-div-main">
                <div className="card shadow my-5">
                    <div className="card-body">
                        <p className="h3 text-start">Study Materials</p>
                        <hr />
                        <div className="accordion" id="accordionExample">

                            {materials.map((mat,key) => {
                                
                                return(
                                <div key={key} className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+"hello"+key+1} aria-expanded="false" aria-controls="collapseOne">
                                            <strong>{key+1} {mat.file_description}</strong>
                                        </button>
                                    </h2>
                                    <div id={"hello"+key+1} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <a className="course-material-link" target="_blank" href={`http://127.0.0.1:8000/${mat.files}`}>{mat.file_name}</a>

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