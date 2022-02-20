//Header Component
import React from "react";
import { Link } from "react-router-dom";

// TODO update header so User renders the user's firstName
// TODO add home icon?
const Header = () => {
  return (
    <div>
      <div>
        <h1>Welcome To Clarity, User.</h1>
      </div>
      <nav>
        <Link to="/signup" className="">
          Sign Up
        </Link>
        <Link to="/login" className="">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Header;
