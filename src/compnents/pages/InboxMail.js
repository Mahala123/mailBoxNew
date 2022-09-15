import React from "react";
import {useSelector, useDispatch, } from "react-redux";
import { mailActions } from "../store/Store";
import {useEffect } from "react";
  const InboxMail = (props) => {
  const dispatch = useDispatch();
  const idemail=useSelector(state=>state.auth.emailid)
  const endpoint = props.data.ID;
  useEffect(() => {
    fetch(
      `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/inbox/${endpoint}/.json`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isRead: true,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/inbox.json`
        )
          .then((res) => res.json())
          .then((data) =>
          {
            dispatch(mailActions.setInbox(data));
          });
      }
    });
  }, [idemail,endpoint,dispatch]);

  const deleteClickHandler = () => {
    fetch(
      `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/inbox/${endpoint}/.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/inbox.json`
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
      <h3>FROM:{props.data.email.from}</h3>
      <h3>DESCRIPTION:{props.data.email.description}</h3>
      <button onClick={deleteClickHandler}>DELETE</button><br/>
      <button onClick={props.onClose}>CLOSE</button>
    </div>
  );
};

export default InboxMail;
