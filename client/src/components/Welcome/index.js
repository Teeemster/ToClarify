import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import logo from "../../assets/logo512.png";
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
          <h2 className="fw-bold mt-3">
            Welcome Back To Clarify, {me.firstName}!
          </h2>
          <p className="fs-5">
            Select one of your projects or click "Add New Project" to get
            started!
          </p>
        </div>
      ) : (
        <div className="text-center m-5">
          <h1>Welcome!</h1>
        </div>
      )}
    </>
  );
}

export default Welcome;
