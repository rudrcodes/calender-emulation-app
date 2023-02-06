import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./Home.css";
export const Home = (props) => {
  const signOutUser = () => {
    signOut(auth)
      .then((user) => {
        console.log(`user signed out -${user}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className="Home_cont">
      <a href="https://www.linkedin.com/in/rudransh-aggarwal-33653a1b6/" target='_'>
        {" "}
        <h2>Rudransh Aggarwal's Assignment</h2>{" "}
      </a>{" "}
      <div className="Home_link_class">
        <h1>
          <Link to="/login">Login</Link>
        </h1>
      </div>
      <div className="Home_link_class">
        <h1>
          <Link to="/signup">Sign Up</Link>
        </h1>
      </div>
      <br />
      <br />
      <br />
      {/* <h3>
        {props.name ? `Welcome - ${props.name}` : "Login to see the meetings"}
      </h3> */}
    </div>
  );
};
