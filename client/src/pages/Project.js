// Project Page
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

import ProjectArea from "../components/ProjectArea";
import ProjectList from "../components/ProjectArea";

const Project = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <p>Project Page</p>
      <section className="project-list">
          <ProjectList></ProjectList>
      </section>
      <section className="project-area">
          <ProjectArea></ProjectArea>
      </section>
    </main>
  );
};

export default Project;
