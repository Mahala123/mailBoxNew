import React, { useState } from 'react'
import './CreateEmail.css'
import './WellcomePage.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
//import { useSelector } from 'react-redux';
import {useRef} from 'react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function CreateMail() {
    const toEmail=useRef()
    const testMail=useRef()
    const userEmail=useSelector(state=>state.auth.email)
    const idemail=useSelector(state=>state.auth.emailid)
    const[editor,setEditor]=useState(EditorState.createEmpty())
    const onSetEditor=(ed)=>
    {
       setEditor(ed)
    }
    
    const sendMailHandler=()=>
    {
     const storeEmail=
     {
      from:userEmail,
      to:toEmail.current.value,
      description:testMail.current.value,
      isRead:false,
     }
     //const cleanToEmail = toEmail.current.value.replace(/[^a-zA-Z ]/g, "");
  fetch(`https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/sentMail.json`,{
      method: 'POST',
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(storeEmail),
    })
    .then((res=>res.json()))
    .then((data)=> {
      // console.log(data);
    })
    //  fetch(`https://mailboxnew-311a6-default-rtdb.firebaseio.com/${idemail}/sentMail.json`,
    //   {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application-json",
    //   },
    //   body: JSON.stringify(storeEmail),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //      console.log(data);
    //   });
      toEmail.current.value = "";
      testMail.current.value = "";
    setEditor(EditorState.createEmpty());
    }
    
  return (
    <Fragment>
    <div className='mailbox'>
      <input type='email' required className="input" placeholder="to" ref={toEmail}></input><br/>
      <input type='email' required className="input" placeholder="Test Mail" ref={testMail} ></input>
      <Editor
          editorState={editor}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onSetEditor}
        /> 
    </div>
    <div>
    <button onClick={sendMailHandler}>SEND MAIL</button>
    </div>
    </Fragment>

  )
}

export default CreateMail;
