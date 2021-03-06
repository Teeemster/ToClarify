// Project Page
import React from "react";

import ProjectSettings from "../components/ProjectSettings";
import ProjectList from "../components/ProjectList";

const Project = () => {
  return (
    <div className="d-flex w-100 m-0 row">
      <div className="d-none d-md-block col-md-3 p-0 bg-grey">
        <ProjectList />
      </div>
      <div className="col-md-9 p-0">
        <ProjectSettings />
      </div>
    </div>
  );
};

export default Project;
