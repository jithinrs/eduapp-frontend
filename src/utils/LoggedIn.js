import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function LoggedIn() {
    let [auth,setAuth]=useState(true)
    let navigate=useNavigate()
    useEffect(()=> {
        let jwt_token = localStorage.getItem('token')
        if(jwt_token === ''){
            setAuth(false)
        }
    },[])
  return (
    auth?<Outlet/>:<Navigate to={"/"}/>
  )
}

export default LoggedIn