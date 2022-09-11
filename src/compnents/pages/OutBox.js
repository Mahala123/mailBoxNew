import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/Store";
import OutBoxMail from "./OutBoxMail";
const OutBox = () => {
  const dispatch = useDispatch();
  const [outSingleMail, setSingleMail] = useState("");
  const emails = useSelector((state) => state.mail.outbox);
 // const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mailboxnew-311a6-default-rtdb.firebaseio.com/sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailActions.setOutbox(data));
      });
  }, [ dispatch]);

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
            {emails[item].to}:
          </span>
          <span>{emails[item].description}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () => {
    setSingleMail("");
  };

  const onSingleMailDeleteHandler = (data) => {
    dispatch(mailActions.setOutbox(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h4>This is outbox</h4>
      {!outSingleMail && emailListJSX}
      {outSingleMail && <OutBoxMail
        onDelete={onSingleMailDeleteHandler}
        onClose={onSingleMailCloseHandler}
        data={outSingleMail}
      /> } 
    </Fragment>
  );
};

export default OutBox;
