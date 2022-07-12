import React, { useContext, useState, useCallback } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "../../firebase/index";
import { AuthContext } from "../../Auth";
import "../../global.css";
import image from "../../images/ripe1.png";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = useCallback(async () => {
    clearErrors();
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          return "invalid credentials";
      }
    }
    if (currentUser) {
      return <Redirect to="/" />;
    }
  }, [email, history, password]);

  const handleSignUp = useCallback(async () => {
    clearErrors()
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        default:
          return "invalid credentials";
      }
    }
  }, [email, history, password]);

  return (
    <section className="login">
      <div className="loginContainer">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={image}
            style={{ width: "100px", height: "  100px" }}
            alt="login"
          />
        </div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          autoFocus
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                Have an account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
