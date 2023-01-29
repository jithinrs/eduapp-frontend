import React ,{useState, useEffect, useContext} from "react";
import axios from "axios";
import AuthContext from "../context/authcontext";





export function AddNewCourse( props) {

  const [allsubjects, setAlldubjects] = useState([])
  const [selSubject, setSelSubjects] = useState([])

  const { user } = useContext(AuthContext)




  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("checking add new course form");
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/courses/all-subjects').then((response) => {
        console.log("podey");
        // setStudent(response.data)
        setAlldubjects(response.data)
    })

}, [])

  const courseSubmit = (e) => {
    e.preventDefault()
    console.log("course func");
    const data = new FormData()
    data.append('user_id', user.user.user_id)
    data.append('image', e.target.image.files[0])
    data.append('subject_id', e.target.subject.value)
    data.append('grade', e.target.grade.value)
    data.append('price', e.target.price.value)
    data.append('course_description', e.target.course_description.value)

    console.log(data);
    axios.post('http://127.0.0.1:8000/courses/create-course',data).then((res) => {
        console.log(res);
        let but1 = document.getElementById('test55')

        but1.click()
        props.funct()
    })

}

const handlesubject = (e) => {
  let value = e.target.value
  setSelSubjects([...selSubject, value])
  // let test1 = Array.from(new Set(selSubject))
  // console.log(test1);
  console.log(selSubject);

}



  return (
    <div>
      <button type="button" className="btn" style={{ backgroundColor: '#F53838', color: "white" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New Course
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New Chapter</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form onSubmit={courseSubmit}>
              <div className="modal-body text-start">
                <div className="row container text-start">
                  <div className="col-md-6">
                    <label htmlFor="">Subject</label>
                    <select onChange={handlesubject} className="form-control" name="subject" id="">
                      {
                        allsubjects.map((subject, key) => {
                          return (

                            <option key={subject.title} value={subject.title}>{subject.title}</option>


                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Class</label>
                    <select className="form-control" name="grade" id="">
                      <option value="8th grade">8th Grade</option>
                      <option value="9th grade">9th Grade</option>
                      <option value="10th grade">10th Grade</option>
                      <option value="11th grade">11th Grade</option>
                      <option value="12th grade">12th Grade</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="">Course Description</label>
                    <input className="form-control" type="text" name="course_description" />
                  </div>
                  <div className="col-md-12">
                      <label htmlFor="">Price</label>
                      <input className="form-control" type="number" min={0} name="price"  />
                  </div>
                  <div>
                    <label htmlFor="">Upload Image</label>
                    <input className="form-control" type="file" name="image"></input>
                  </div>
                </div>

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