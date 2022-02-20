import React from "react";
import { Link } from "react-router-dom";
import { QUERY_MY_PROJECTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const ProjectList = () => {
  const { loading, data } = useQuery(QUERY_MY_PROJECTS);
  const projects = data?.myProjects || {};

  if (loading) {
      return <p>Loading...</p>
  }

  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <ul className="list-group list-group-flush">
      {projects &&
        projects.map((project) => (
          <li key={project._id} className="list-group-item bg-grey">
            <Link to={`/project/${project._id}`}>{project.title}</Link>
          </li>
        ))}
    </ul>
  );
};

export default ProjectList;
