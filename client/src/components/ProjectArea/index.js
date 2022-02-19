//ProjectArea Component
import React from "react";
import { useParams, Link } from "react-router-dom";

import TaskList from "../TaskList";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../../utils/queries";

// TODO : "View/Add Client" button *may need to be own page/component
// TODO : Work on JSX

const ProjectArea = () => {
  const { id: projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-area">
      `{" "}
      <div className="project-area-title">
        <h2>{project.title}</h2>
        <Link to={`/${projectId}/clients`}>
          <button className="btn ml-auto">View/Add Client</button>
        </Link>
      </div>
      <div className="project-area-tasks">
        <div className="project-area-requests">
          <TaskList></TaskList>
        </div>
        <div className="project-area-progress">
          <TaskList></TaskList>
        </div>
        <div className="project-area-complete">
          <TaskList></TaskList>
        </div>
      </div>
      `
    </div>
  );
};

export default ProjectArea;
