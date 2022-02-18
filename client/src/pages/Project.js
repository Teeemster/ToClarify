// Project Page
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const Project = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <p>Project Page</p>
    </main>
  );
};

export default Project;
