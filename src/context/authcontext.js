import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()


export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [tokendetails, setTokendetails] = useState(() => localStorage.getItem('tokendetails') ? JSON.parse(localStorage.getItem('tokendetails')) : null)
    //let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [authtokens, setAuthtokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [firstname, setFirstname] = useState(() => localStorage.getItem('firstname') ? JSON.parse(localStorage.getItem('firstname')) : null)
    let [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : null)
    let [userEmail, setUserEmail] = useState(() => localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : null)
    let [userRole, setuserRole] = useState(() => localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null)

    let [number, setNumber] = useState('')
    let [otpstatus, setOtpstatus] = useState('no')
    let [open, setOpen] = useState(false)
    let [alertMessage, setAlertMessage] = useState('')
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    let BASE_URL = "http://127.0.0.1:8000"

    const loginsubmit = (e) => {
        e.preventDefault();
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
                // console.log(res.data);
                if (res.data.message === "Invalid email or password!") {
                    setAlertMessage("Invalid Email or password")
                    setOpen(true)

                } else if (res.data.message === "User is not Verified") {
                    setAlertMessage("User is not Verified")
                    setOpen(true)
                }

                else {
                    let tokendetail = jwt_decode(res.data.token.access)
                    setTokendetails(tokendetail)
                    localStorage.setItem('tokendetails', JSON.stringify(tokendetail))
                    console.log(tokendetails);
                    if (tokendetail?.Roles == "S") {
                        setuserRole('student')
                        localStorage.setItem('role', JSON.stringify('student'))
                    } else if (tokendetail?.Roles == "T") {
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
                    if (tokendetail?.Roles == "S") {
                        navigate('student-home')
                    } else if (tokendetail?.Roles == "T") {
                        console.log("hellopoda");
                        console.log(tokendetail);
                        console.log("hellopoda");
                        navigate('teacher-home')
                    } else {
                        navigate('/')
                    }

                }
            })


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
                    setAuthtokens(res.data.token)
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

    const tokenrefresher = () => {
        console.log("refreshed");
        let user_id = user.user.user_id
        console.log((user_id));
        axios.post('http://127.0.0.1:8000/account/tokenrefresher', { user_id: user_id }).then((res) => {
            console.log(res);
            let tokendetail = jwt_decode(res.data.token.access)
            setTokendetails(tokendetail)
            localStorage.setItem('tokendetails', JSON.stringify(tokendetail))
            console.log(tokendetails);
            if (tokendetail?.Roles == "S") {
                setuserRole('student')
                localStorage.setItem('role', JSON.stringify('student'))
            } else if (tokendetail?.Roles == "T") {
                setuserRole('teacher')
                localStorage.setItem('role', JSON.stringify('teacher'))
            }
            setAuthtokens(res.data.token)
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
        })

    }

    const logoutUser = (e) => {
        e.preventDefault()
        setUser(null)
        setAuthtokens(null)
        setFirstname(null)
        setIsAdmin(null)
        setUserEmail(null)
        setuserRole(null)
        setTokendetails(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('firstname')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('email')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        localStorage.removeItem('tokendetails')
    }


    const updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/account/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authtokens?.refresh })
        })

        let res = await response.json()

        console.log('first');
        console.log(res);
        let tokendetail = jwt_decode(res.access)
        setTokendetails(tokendetail)
        setAuthtokens(res)
    }

    // useEffect(() => {
    //     let fourMinutes = 1000*60*40

    //     let interval = setInterval(() => {
    //         if (authtokens) {
    //             updateToken()
    //         }
    //     }, fourMinutes)
    //     return () => clearInterval(interval)
    // })

    let contextData = {
        open: open,
        user: user,
        userRole: userRole,
        userEmail: userEmail,
        firstname: firstname,
        otpstatus: otpstatus,
        isAdmin: isAdmin,
        alertMessage: alertMessage,
        tokendetails: tokendetails,
        authtokens:authtokens,
        BASE_URL:BASE_URL,

        setOpen: setOpen,
        setuserRole: setuserRole,
        loginsubmit: loginsubmit,
        Otploginphone: Otploginphone,
        otpsubmit: otpsubmit,
        logoutUser: logoutUser,
        tokenrefresher: tokenrefresher
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}