import React from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_MY_PROJECTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ProjectForm from "../ProjectForm";

const ProjectList = () => {
  const { loading, data } = useQuery(QUERY_MY_PROJECTS);
  const projects = data?.myProjects || {};
  const { projectId } = useParams();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-3">
      <h3 className="fs-4 fw-bold m-3">My Projects</h3>
        {!projects.length ? (
          <p className="mt-3">You haven't started any projects, yet.</p>
        ) : (
          <ul className="project-list list-group list-group-flush">
            {projects.map((project) => (
              <li key={project._id} className={(project._id === projectId) ? "list-group-item bg-purple p-0" : "list-group-item bg-grey p-0"}>
                <Link to={`/project/${project._id}`} className="text-white text-decoration-none d-inline-block w-100 px-3 py-2">{project.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <div className="m-3">
          <ProjectForm />
        </div>
    </div>
  );
};

export default ProjectList;
