import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithgoogle,
} from "../../firebase/Auth";
import google_icon from "../../../assets/google_icon.png";

function Login() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigned) {
      setIsSignedIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSignedIn(false);
      }
    }
  };
  const onGoogleSignIn = (e) => {
    if (!isSigned) {
      setIsSignedIn(true);
      doSignInWithgoogle().catch((err) => {
        setIsSignedIn(false);
      });
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailId">Email Id:</label>
          <br />
          <input
            type="email"
            id="emailId"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button disabled={!password || !email ? true : false}>Log In</button>
        </form>
        <br />
        {errorMessage && (
          <p className="error">
            <i class="fa-solid fa-circle-info"></i> Invalid email/password
          </p>
        )}
        <p>
          Not Registered?<span onClick={handleSignup}> Sign Up Here</span>
        </p>
        <div className="line">
          <hr />
          Or
          <hr />
        </div>
        <button
          disabled={isSigned}
          onClick={onGoogleSignIn}
          className="google-login"
        >
          <img
            src={google_icon}
            alt=""
          />
          Continue with google
        </button>
        <div className="demo-account">
          <h2>Use demo account:</h2>
          <p>Demo@gmail.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
