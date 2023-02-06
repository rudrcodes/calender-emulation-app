import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import "./Signup.css";
export const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    pass: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill All Fields");
      return;
    }
    setErrorMsg("");

    // console.log(values);
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        console.log(res);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message);
        setSubmitButtonDisabled(false);
      });
  };
  return (
    <div className="Signup_cont">
      <Link className="backtohome" to="/">{"->"} Back to Home</Link>

      <div className="Signup_Form">
        <h1>Sign Up</h1>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <br />
        <label>Password</label>
        <input
          type="text"
          placeholder="password"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, pass: e.target.value }));
          }}
        />
        <br />
        <h2>{errorMsg}</h2>
        <br />
        <button onClick={handleSubmit} disabled={submitButtonDisabled}>
          SignUp
        </button>
        <br />
        <h3>Already have an account?</h3>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
