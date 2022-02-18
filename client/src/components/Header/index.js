//Header Component
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

// TODO update header so User renders the user's firstName
// TODO add home icon?
const Header = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const me = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Welcome To Clarity, {me.firstName}.</h1>
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
