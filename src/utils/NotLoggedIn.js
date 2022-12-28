import React, { useState, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function NotLoggedIn() {
    let [auth,setAuth]=useState(true)
    let navigate=useNavigate()
    useEffect(()=> {

        let jwt_token = localStorage.getItem('token')
        console.log(jwt_token);
        if(jwt_token !== ""){
            setAuth(false)
        }
    },[])
  return (
    auth?<Navigate to={"/login"}/>:<Outlet/>
  )
}

export default NotLoggedIn