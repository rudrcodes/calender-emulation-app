import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";
export const Login = (props) => {
  const initialState = {
    email: "",
    pass: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill All Fields");
      return;
    }
    setErrorMsg("");

    // console.log(values);
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        // console.log(res);
        const userEmailAndPass = {
          userEmail: values.email,
          userPass: values.pass,
        };
        localStorage.setItem("user", JSON.stringify(userEmailAndPass));
        props.setUserInfofromLoginComp(userEmailAndPass);
        setSubmitButtonDisabled(false);
        navigate("/calender");
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message);
        setSubmitButtonDisabled(false);
      });
  };
  return (
    <div className="Login_cont">
      <Link className="backtohome" to="/">
        {" "}
        {"->"} Back to Home
      </Link>
      <div className="Login_Form">
        <h1>Login</h1>

        <label>Email</label>
        <input
          placeholder="Email"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <br />
        <label>Password</label>
        <input
          placeholder="password"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, pass: e.target.value }));
          }}
        />
        <br />
        <h2>{errorMsg}</h2>

        <br />

        <button onClick={handleSubmit} disabled={submitButtonDisabled}>
          Login
        </button>
        <br />
      </div>
    </div>
  );
};
