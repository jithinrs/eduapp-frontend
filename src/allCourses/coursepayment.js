
import React, {useContext} from "react";
import AuthContext from "../context/authcontext";

import ReactDOM from "react-dom"
import axios from "axios";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export function YourComponent(props) {
    const { authtokens } = useContext(AuthContext)

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    console.log("payment succesful");
    console.log(props.courseid);
    const response = await axios.post('http://127.0.0.1:8000/student/course-join',{course_id:props.courseid},{
        
        headers: {
            'Authorization': 'Bearer ' + String(authtokens?.token.access)
        },
        

    })
    console.log(response);
    props.funct()
    return actions.order.capture();
  };
  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

