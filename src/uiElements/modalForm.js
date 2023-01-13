import React from "react";
import axios from "axios";

export function ModalForm(props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(props.courseid);
    let courseid = props.courseid


    let chapter_name = e.target.chapter_name.value
    let chapter_description = e.target.chapter_description.value


    axios.post('http://127.0.0.1:8000/courses/add-new-chapter/' + courseid, {
      course_id: courseid,
      chapter_name: chapter_name,
      chapter_description : chapter_description
    }).then((respose) => {
      console.log(respose);
      let but1 = document.getElementById('test55')
      but1.click()
      props.funct()
    })


  }




  return (
    <div>

      <button type="button" className="btn" style={{ backgroundColor: '#F53838', color: "white" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New Chapters
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New Chapter</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body text-start">
                <label htmlFor="">Chapter Name</label>
                <input name="chapter_name" className="form-control" type="text" />
                <label htmlFor="">Chapter Description</label>
                <textarea className="form-control" name="chapter_description" cols="30" rows="5"></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" id="test55" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}