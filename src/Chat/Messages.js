import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
import AuthContext from "../context/authcontext";

// import { MessageModel } from "../models/Message";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Message({ message }) {
//   const { user } = useContext(AuthContext);
  const { tokendetails } = useContext(AuthContext)
  const { authtokens } = useContext(AuthContext)
  const user = tokendetails.user_id
  console.log("test23" + user);

  function formatMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }

  return (
    <div
      className={
        user === message.to_user.id ? "d-flex justify-content-start" : "d-flex justify-content-end"
      }
    >
      <div
        className={
          
          user == message.from_user.id ? "text-danger" : "text-dark"
        }
      >
        <div className={
          
          user == message.from_user.id ? "btn btn-danger mb-1" : "btn btn-primary mb-1"
        }>
          <span className="block">{message.content}</span>
          <span
            className="ml-2"
            style={{
              fontSize: "0.6rem",
              lineHeight: "1rem"
            }}
          >
            {formatMessageTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}