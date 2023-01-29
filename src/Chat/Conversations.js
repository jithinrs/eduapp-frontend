import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";
import { TeacherNavbar } from "../Components/teacherNavbar";
import { StudentNavbar } from "../Components/studentNavbar";



import './style.css'



export function Conversations() {
    const { authtokens } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch("http://127.0.0.1:8000/chat/allusers", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authtokens?.token.access)
                }
            });
            const data = await res.json();
            setUsers(data);
            console.log(data);
        }
        fetchUsers();
    }, [tokendetails]);

    function createConversationName(user_id) {
        let a =[tokendetails?.user_id, user_id]
        console.log(a);
        const namesAlph = [tokendetails?.user_id, user_id]
        console.log(namesAlph);
        return `${namesAlph[0]}__${namesAlph[1]}`;
    }

    return (
        <div>
            { tokendetails?.Roles === "T"?
                <TeacherNavbar></TeacherNavbar>
                :
                <div>
                    <NavBar></NavBar>
                    <StudentNavbar></StudentNavbar>
                </div>
            }

            {users
                .filter((u) => u.id !== tokendetails?.user_id)
                .map((u) => (
                    <Link to={`chats/${createConversationName(u.id)}`} className="chat-users">
                        <div key={u.id}>{u.first_name} {u.last_name}</div>
                    </Link>
                ))}
        </div>
    );
}