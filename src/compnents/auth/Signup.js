import { useState } from "react";
import "./SignUp.css";
import React from "react";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(event)=>{
   event.preventDefault()
  }
  return (
    <div className="Body">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" required />
        <br />

        <input type="password" placeholder="Password" required />
        <br />

        <input type="password" placeholder="Confirm Password" required />
        <br />
        <button>{isLogin ? "Login" : "Create Account"}</button>
        <br />

        <button
          type="button"
          className="signupBtn"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
