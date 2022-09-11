import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/Store";

//import classes from './SingleMail.module.css';

const InboxMail = (props) => {
  const dispatch = useDispatch();
 // const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const endpoint = props.data.ID;
  useEffect(() => {
    fetch(
      `https://projectdemo-cb4b5-default-rtdb.firebaseio.com/inbox/${endpoint}.json`,
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
          `https://projectdemo-cb4b5-default-rtdb.firebaseio.com/inbox.json`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(mailActions.setInbox(data));
          });
      }
    });
  }, [endpoint, dispatch]);

  const deleteClickHandler = () => {
    fetch(
      `https://mail-box-73bc7-default-rtdb.firebaseio.com/inbox/${endpoint}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mail-box-73bc7-default-rtdb.firebaseio.com/inbox.json`
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
      <button onClick={props.onClose}>Close</button>
      <h3>{props.data.email.from}</h3>
      <h3>{props.data.email.description}</h3>
      <div dangerouslySetInnerHTML={{ __html: props.data.email.body }} />
      <button onClick={deleteClickHandler}>Delete This Email!</button>
    </div>
  );
};

export default InboxMail;
