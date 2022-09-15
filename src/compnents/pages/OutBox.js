import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/Store";
import OutBoxMail from "./OutBoxMail";
const OutBox = () => {
  const dispatch = useDispatch();
  const [outSingleMail, setSingleMail] = useState("");
  const emails = useSelector((state) => state.mail.outbox);
  const id1 = useSelector((state) => state.auth.emailid);

  useEffect(() => {
    fetch(
      `https://mailboxnew-311a6-default-rtdb.firebaseio.com/${id1}/sentMail.json`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailActions.setOutbox(data));
      });
  }, [id1, dispatch]);

  const openEmailClickHandler = (event) => {
    setSingleMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
  };

  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).reverse().map((item) => (
        <li 
          id={item}
          onClick={openEmailClickHandler}
          key={item}
        >
          <span >
           TO: {emails[item].to}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  // const onSingleMailCloseHandler = () => {
  //   setSingleMail("");
  // };

  const onSingleMailDeleteHandler = (data) => {
    dispatch(mailActions.setOutbox(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h1>OUTBOX</h1>
      {!outSingleMail && emailListJSX}
      {outSingleMail && <OutBoxMail
        onDelete={onSingleMailDeleteHandler}
        data={outSingleMail}
      /> } 
    </Fragment>
  );
};

export default OutBox;
