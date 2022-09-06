import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authSliceCreate } from '../store/Store'
import CreateMail from './CreateMail'
//import './WellcomePage.css'

function WellcomePage() {
  const dispatch=useDispatch()
  const[mail,setMail]=useState(false)
  const createMailHandler=()=>
  {
     setMail(true)
  }
  const logOutHandler=()=>
  {
    dispatch(authSliceCreate.logOut())
  }
  return (
    <div>
    <button onClick={logOutHandler}>LOG OUT</button>
      <h2>WELLCOME TO MAIL BOX</h2>
      <button onClick={createMailHandler}>Create Email</button>
      <button>Inbox</button>
      <button>Outbox</button>
      <div >
      {mail &&  <CreateMail/>}
      </div>
      
    </div>
  )
}

export default WellcomePage
