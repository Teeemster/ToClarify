import React from "react";
import { Link } from "react-router-dom";
import { QUERY_MY_PROJECTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ProjectForm from "../ProjectForm";

const ProjectList = () => {
  const { loading, data } = useQuery(QUERY_MY_PROJECTS);
  const projects = data?.myProjects || {};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-3">
      <h3 className="fs-4 fw-bold">My Projects</h3>
      {!projects.length ? (
        <p className="mt-3">You haven't started any projects, yet.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {projects.map((project) => (
            <li key={project._id} className="list-group-item bg-grey">
              <Link to={`/project/${project._id}`}>{project.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3">
        <ProjectForm />
      </div>
    </div>
  );
};

export default ProjectList;
