// import {Route, redirect} from 'react-router-dom'

// export const PrivateRoute = ({children, ...rest}) => {
//     console.log("router working?");
//     return (
//         <Route {...rest}>
//             {children}
//         </Route>
//     )
// }


//************************************************* */


import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authcontext";

export const PrivateRoute = () => {
//   const token = useSelector((state) => state.auth.token);
    // const authenticated = false
    let {user} = useContext(AuthContext)
    const token = false

  return (
    user
      ? <Outlet/>
      : <Navigate to='login' />
  )
}

export const AdminRoute = () => {
  let {isAdmin} = useContext(AuthContext)
  console.log(isAdmin);
  // isAdmin = true
  return(
    isAdmin 
    ? <Outlet />
    :<Navigate to ="/" />
  )
}

export const TeacherRoute = () => {
  let {userRole} = useContext(AuthContext)

  return(
    userRole === 'teacher' ? <Outlet /> : <Navigate to ='/' />
  )
}