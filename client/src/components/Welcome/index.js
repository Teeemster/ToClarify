import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import logo from "../../../public/logo512.png";

function Welcome() {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={logo} alt="Magnify glass logo" />
      <h2>Welcome Back To Clarity {me.firstName}</h2>
      <p>
        Select one of your projects or click "Add New Project" to get started!
      </p>
    </div>
  );
}

export default Welcome;
