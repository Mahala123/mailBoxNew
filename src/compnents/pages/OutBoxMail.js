import React from "react";
import { useSelector } from "react-redux";
//import classes from './OutBoxSingleMail.module.css';

const OutBoxMail = (props) => {
 const cleanUserEmail = useSelector((state) => state.auth.emailid);
 const endpoint = props.data.ID;
 
  const deleteClickHandler = () => {
    fetch(
     `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails/${endpoint}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`
        )
          .then((res) => res.json())
          .then((data) => {
            props.onDelete(data);
          });
      }
    });
  };

  return (
    <div >
      
      <h3>TO:{props.data.email.to}</h3>
      <h3>DESCRIPTION:{props.data.email.description}</h3>
      <button onClick={deleteClickHandler}>Delete This Email!</button> 
    </div>
  );
};

export default OutBoxMail;
