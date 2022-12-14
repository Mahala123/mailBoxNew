import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authSliceCreate } from '../store/Store'
import CreateMail from './CreateMail'
import Inbox from './Inbox'
//import axios from "axios"
import OutBox from './OutBox'
//import InboxMail from './InboxMail'
//import './WellcomePage.css'

function WellcomePage() {
  const dispatch=useDispatch()
  const[mail,setMail]=useState(false)
  const[inboxOpen,setInboxOpen]=useState(false)
  const[outBox,setOutBox]=useState(false)
  const[unMess,setUnMess]=useState()
  
  const createMailHandler=()=>
  {
     setMail(true)
     setInboxOpen(false)
     setOutBox(false)
  }
  const openInBox=()=>{
    setInboxOpen(true)
    setMail(false)
    setOutBox(false)
  }
  const openOutBox=()=>
  {
    setInboxOpen(false)
    setMail(false)
    setOutBox(true)
  }
  const logOutHandler=()=>
  {
    dispatch(authSliceCreate.logOut())
  }
  const setUnreadHandler = (data) => {
    setUnMess(data);  
  }
  return (
    <div>
    <button onClick={logOutHandler}>LOG OUT</button>
      <h2>WELLCOME TO MAIL BOX</h2>
      {unMess ? <span>MESSAGE: {unMess}</span> : ''}<br/>
      <button onClick={createMailHandler}>Create Email</button>
      <button onClick={openInBox}>Inbox</button>
      <button onClick={openOutBox}>SentBox</button>
      <div>
        {mail &&<CreateMail/>}
        {inboxOpen && <Inbox setUnread={setUnreadHandler}/>}
        {outBox&&<OutBox/>}
      </div>
      </div>)

}

export default WellcomePage
