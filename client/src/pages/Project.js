// Project Page
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

import ProjectArea from "../components/ProjectArea";
import ProjectList from "../components/ProjectList";

const Project = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="d-flex w-100 m-0 row">
      <div className="d-none d-md-block col-md-3 p-0 bg-grey">
        <ProjectList />
      </div>
      <div className="col-md-9 p-0">
        <h1>Project Area</h1>
      </div>
    </div>
  );
};

export default Project;
