import React, { useState, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";
import { NavBar } from "../Components/navBar";
import { TeacherNavbar } from "../Components/teacherNavbar";
import { StudentNavbar } from "../Components/studentNavbar";

import { Message } from "./Messages";




export default function Chatapp() {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const { authtokens } = useContext(AuthContext)
    const { tokendetails } = useContext(AuthContext)

    const { conversationName } = useParams();

    console.log(messageHistory);


    const { readyState, sendJsonMessage } = useWebSocket(authtokens ? `ws://127.0.0.1:8000/${conversationName}/` : null, {

        queryParams: {
            token: authtokens ? authtokens.token.access : "",
        },
        onOpen: () => {
            console.log("Connected!");
        },
        onClose: () => {
            console.log("Disconnected!");
        },
        // onMessage handler
        onMessage: (e) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "welcome_message":
                    setWelcomeMessage(data.message);
                    break;
                case "chat_message_echo":
                    setMessageHistory((prev) => prev.concat(data.message));
                    break;
                case "last_50_messages":
                    setMessageHistory(data.messages);
                    break;
                default:
                    console.error("Unknown message type!");
                    break;
            }
        }
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];

    function handleChangeMessage(e) {
        setMessage(e.target.value);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        sendJsonMessage({
            type: "chat_message",
            message,
            name
        });
        setName("");
        setMessage("");
    };

    return (
        <div>
            {/* <span>The WebSocket is currently {connectionStatus}</span> */}
            {/* <p>{welcomeMessage}</p> */}
            { tokendetails?.Roles === "T"?
                <TeacherNavbar></TeacherNavbar>
                :
                <div>
                    <NavBar></NavBar>
                    <StudentNavbar></StudentNavbar>
                </div>
            }
            
            <input
                name="message"
                placeholder="Message"
                onChange={handleChangeMessage}
                value={message}
                className="form-control mt-4"
            />
            <button className=" mx-4 mt-2 btn btn-primary" onClick={handleSubmit}>
                Submit
            </button>
           
            <ul className="mt-3 flex flex-col-reverse relative w-full border border-gray-200 overflow-y-auto p-6">
                {messageHistory.map((message) => (
                    <Message key={message.id} message={message} />
                    
                ))}
            </ul>
            {/* <input
                name="name"
                placeholder="Name"
                onChange={handleChangeName}
                value={name}
                className="shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
            /> */}
           
            {/* <ul>
                {messageHistory.map((message, idx) => (
                    <div className="border border-gray-200 py-3 px-3" key={idx}>
                        {message?.from_user?.id}: {message?.content}
                    </div>
                ))}
            </ul> */}
        </div>
    );
}