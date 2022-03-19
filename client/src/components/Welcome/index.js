import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

function Welcome() {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loggedIn ? (
        <div className="text-center m-5">
          <img src={logo} className="img-fluid" alt="Magnify glass logo" />
          <h2 className="fw-bold mt-3">Welcome To Clarify, {me.firstName}!</h2>
          <p className="fs-5">
            Select one of your projects or click "Add New Project" to get
            started!
          </p>
        </div>
      ) : (
        <div className="text-center m-5 fw-b">
          <h1 className="fw-bold mt-3">Welcome to Clarify!</h1>
          <img src={logo} className="img-fluid my-5" alt="Magnify glass logo" />
          <h2>Bringing clarity to freelancers and their clients.</h2>
          <div className="my-4">
            <Link to="/signup" className="btn btn-purple text-white fw-bold mx-2">Sign Up</Link>
            <Link to="/login" className="btn btn-purple text-white fw-bold mx-2">Login</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Welcome;
