import { useRef } from "react";
import "./SignUp.css";
import React from "react";
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { authSliceCreate } from "../store/Store";
//import WellcomePage from "../pages/WellcomePage";

function Signup() {
  const email = useRef();
  const password = useRef();
  const confPassword = useRef();
  const history=useHistory()
  // const [isLogin, setIsLogin] = useState(true);
  const dispatch=useDispatch()
  const login=useSelector(state=>state.auth.logeIn)
  const switchAuthModeHandler = () => {
   dispatch(authSliceCreate.logedIn())
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
    const enterEmail = email.current.value;
    const enterPass = password.current.value;
    const enterConfPass = confPassword.current.value;
    if(enterPass!==enterConfPass){
      alert("Confirm Password is not Same");
      return;
  }
    let url;
    if (login) {
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlkmibUq84JtldDSFlRIZSAAlj5l8AD9M`
    } else {
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlkmibUq84JtldDSFlRIZSAAlj5l8AD9M`  
    }
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enterEmail,
          password: enterPass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res=>{
      if(res.ok)
      {

      alert('successfully created')
      return res.json()
      }
      else
      {
        res.json().then(data=>
          {
            console.log(data.error.message)
            alert(data.error.message)
          })
      }
    }).then(data=>{
      console.log(data)
      dispatch(authSliceCreate.tokenId(data.idToken))
      history.replace('/welcome')
    }).catch(err=>{
      alert(err.message)
    })
  };
  return (
    <div className="Body">
      <h2>{login ? "Login" : "Sign Up"}</h2>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" ref={email} required />
        <br />

        <input type="password" placeholder="Password" ref={password} required />
        <br />

        <input
          type="password"
          placeholder="Confirm Password"
          ref={confPassword}
          required
        />
        <br />
        <button>{login ? "Login" : "Create Account"}</button>
        <br />

        <button
          type="button"
          className="signupBtn"
          onClick={switchAuthModeHandler}
        >
          {login? "Create new account" : "Login with existing account"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
