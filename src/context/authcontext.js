import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()


export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [authtokens, setAuthtokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [firstname, setFirstname] = useState(() => localStorage.getItem('firstname') ? JSON.parse(localStorage.getItem('firstname')) : null)
    let [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : null)
    let [userEmail, setUserEmail] = useState(() => localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : null)
    let [userRole, setuserRole] = useState(() => localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null)

    let [number, setNumber] = useState('')
    let [otpstatus, setOtpstatus] = useState('no')

    const navigate = useNavigate()

    let loginuser = async (e) => {
        e.preventDefault();
        console.log("hello hkjhkj");
        // let response = fetch('http://127.0.0.1:8000/account/login',{
        //     method : 'POST',
        //     headers : {
        //         'Content-type' : 'application/json'
        //     },
        //     body : JSON.stringify({'email': null, 'password' : null})
        // })
    }

    const loginsubmit = (e) => {
        e.preventDefault();
        console.log("work ayade?");
        let email = e.target.email.value
        let password = e.target.password.value
        if (email === '' || password === '') {
            // setError(true);
            window.alert("enter correct")
        } else {
            axios.post('http://127.0.0.1:8000/account/login', {
                email: email,
                password: password
            }).then((res) => {
                // console.log(res.data.token.access);
                // console.log(res);
                if (res.data.message === "Invalid email or password!") {
                    console.log("poda");
                    window.alert("something went wrong!")
                }else if(res.data.message === "User is not Verified"){
                    window.alert("user not verified")
                }
                
                else {
                    if(res.data.user.isStudent == true){
                        setuserRole('student')
                        localStorage.setItem('role', JSON.stringify('student'))
                    } else if(res.data.user.isTeacher == true){
                        setuserRole('teacher')
                        localStorage.setItem('role', JSON.stringify('teacher'))
                    }
                    setAuthtokens(res.data)
                    setFirstname(res.data.user.firstname)
                    setIsAdmin(res.data.user.isAdmin)
                    setUserEmail(res.data.user.email)
                    // console.log(res.data.user.firstname);
                    const test23 = jwt_decode(res.data.token.access)
                    console.log(test23.user_id);
                    setUser(res.data)
                    // localStorage.setItem('user', test23.user_id)
                  
                    localStorage.setItem('firstname', JSON.stringify(res.data.user.firstname))
                    localStorage.setItem('email', JSON.stringify(res.data.user.email))
                    console.log(res.data.user.email);
                    localStorage.setItem('authToken', JSON.stringify(res.data))
                    localStorage.setItem('isAdmin', JSON.stringify(res.data.user.isAdmin))
                    navigate('/')
                    // console.log(res.data.token.access);
                }
            })

            // setSubmitted(true);
            // setError(false);
        }
    };

    const Otploginphone = (e) => {
        e.preventDefault();
        let mobile = e.target.mobile.value
        setNumber(mobile)
        if (mobile === '') {
            window.alert("enter correct")
        } else {
            axios.post('http://127.0.0.1:8000/account/otplogin', {
                mobile: mobile
            }).then((res) => {
                console.log(res);
                if (res.data.message === "mobile is not registered") {
                    window.alert("This mobile is not registered")
                } else {
                    console.log("working");
                    setOtpstatus('yes')
                }

            })
        }
    }

    const otpsubmit = (e) => {
        e.preventDefault()
        console.log('otp adikkan samayam ayi?');
        let otp = e.target.otp.value
        if (otp === 1) {
            window.alert('emptyfield')
        } else {
            axios.post('http://127.0.0.1:8000/account/otpverify', {
                mobile: number,
                otp: otp
            }).then((res) => {
                if (res.data.message === "invalid otp") {
                    console.log("poda");
                    window.alert("invalid otp")
                } else {
                    setAuthtokens(res.data)
                    setFirstname(res.data.user.firstname)
                    console.log(res.data.user.firstname);
                    setUser(jwt_decode(res.data.token.access))
                    console.log(jwt_decode(res.data.token.access))

                    localStorage.setItem('authToken', JSON.stringify(res.data))
                    navigate('/')
                    // console.log(res.data.token.access);
                }
            })
        }
    }


    const logoutUser = (e) => {
        e.preventDefault()
        setUser(null)
        setAuthtokens(null)
        setFirstname(null)
        setIsAdmin(null)
        setUserEmail(null)
        setuserRole(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('firstname')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('email')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
    }


    const updateToken = (e) => {
        e.preventDefault();
        console.log("work ayade?");
        let email = e.target.email.value
        let password = e.target.password.value
        if (email === '' || password === '') {
            // setError(true);
            window.alert("enter correct")
        } else {
            axios.post('http://127.0.0.1:8000/account/api/token/refesh', {
                email: email,
                password: password
            }).then((res) => {
                // console.log(res.data.token.access);
                // console.log(res);
                if (res.data.message === "Invalid email or password!") {
                    console.log("poda");
                    window.alert("something went wrong!")
                } else {
                    setAuthtokens(res.data)
                    setFirstname(res.data.user.firstname)
                    console.log(res.data.user.firstname);
                    setUser(jwt_decode(res.data.token.access))
                    console.log(jwt_decode(res.data.token.access))
                    localStorage.setItem('firstname', JSON.stringify(res.data.user.firstname))
                    localStorage.setItem('authToken',(res.data))
                    navigate('/')
                    // console.log(res.data.token.access);
                }
            })

            // setSubmitted(true);
            // setError(false);
        }
    };

    let contextData = {
        user: user,
        userRole:userRole,
        userEmail: userEmail,
        firstname: firstname,
        otpstatus: otpstatus,
        isAdmin : isAdmin,
        setuserRole:setuserRole,
        loginsubmit: loginsubmit,
        Otploginphone: Otploginphone,
        otpsubmit: otpsubmit,
        logoutUser: logoutUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}