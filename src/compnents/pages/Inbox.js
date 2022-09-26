import React from "react";
import './Inbox.css'
import { useSelector,useDispatch } from "react-redux";
import { mailActions } from "../store/Store";
import InboxMail from "./InboxMail";
import { useState } from "react";
import { useEffect } from "react";
function Inbox(props) {
  const emails = useSelector((state) => state.mail.inbox);
  const idemail=useSelector(state=>state.auth.emailid)
  const dispatch = useDispatch();
  //console.log(emails);
  const [mail,setMail] = useState("");
  if (emails) {
    props.setUnread(Object.keys(emails).reduce((p,key)=>{
      if(!emails[key].isRead) return p+1;
      return p;
    },0))
  }
  useEffect(() => {
    fetch(`https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/inbox.json`)
      .then((res) => res.json())
      .then((data) => { 
        dispatch(mailActions.setInbox(data));
        //console.log(data)
      });
  }, [idemail,dispatch]);

  const openEmail = (event) => {
    setMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
  };
  const emailList = emails ? (
      <ul className="li1">
        {Object.keys(emails)
          .reverse()
          .map((item) => (
            <li id={item} onClick={openEmail} key={item}
              style={{
            backgroundColor: emails[item].isRead ?'white':'',
          }}>
         
            {!emails[item].isRead && <div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'green'}}/>}
              <span>FROM:{emails[item].from}</span>
             
            </li>
          ))}
      </ul>
    ):(
      <p>No Emails Found</p>
    );
    
    
  const mailCloseHandler = () => {
    setMail("");
  };

  const mailDeleteHandler = (data) => {
    dispatch(mailActions.setInbox(data));
    setMail("");
  };

  return (
    <div>
      <h1>INBOX</h1>
      {!mail && emailList}
      {mail && <InboxMail 
      onClose={mailCloseHandler}
      onDelete={mailDeleteHandler}
      data={mail} />}
      
    </div>
  );
}

export default Inbox;

