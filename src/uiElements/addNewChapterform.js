import React from "react";
import axios from "axios";

export function AddNewChapterForm(props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('files', e.target.files.files[0])
    data.append('chapter_slug', props.slug)
    data.append('file_name', e.target.file_name.value)
    data.append('file_description', e.target.file_description.value)

    axios.post('http://127.0.0.1:8000/courses/new-chapter-material-add/', data).then((respose) => {
      console.log(respose);
      let but1 = document.getElementById('test55')
      but1.click()
      props.funct()
      e.target.file_name.value = null;
      e.target.file_description.value = null;
    })


  }




  return (
    <div>

      <button type="button" className="btn" style={{ backgroundColor: '#F53838', color: "white" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New Materials
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
                <label htmlFor="">Name of the file</label>
                <input name="file_name" className="form-control" type="text" />
                <label htmlFor="">File description</label>
                <textarea className="form-control" name="file_description" cols="30" rows="5"></textarea>
                <label htmlFor="">Add File</label>
                <input type="file" name="files" className="form-control" />
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