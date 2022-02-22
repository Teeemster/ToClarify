// Project Detail Component
import React from "react";
import { useParams, Link } from "react-router-dom";

import TaskList from "../TaskList";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../../utils/queries";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

// TODO : "View/Add Client" button *may need to be own page/component
// TODO : Work on JSX

const ProjectDetail = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId },
  });

  const project = data?.project || {};

  console.log(project)

  if (loading) {
    return (
      <div className="m-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="clearfix mb-4">
        <div className="float-start">
          <h2 className="fw-bold">
            <Link to="/" className="link-white d-inline d-md-none">
              <Icon path={mdiMenu} size={1.5} />
            </Link>{" "}
            {project.title}
          </h2>
        </div>
        <div className="float-end">
          <Link to={`/project/${projectId}/clients`}>
            <button className="btn btn-purple text-white fw-bold d-none d-md-inline-block">
              View/Add Client
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="Requested"
              projectId={projectId}
            ></TaskList>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="In Progress"
              projectId={projectId}
            ></TaskList>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="Complete"
              projectId={projectId}
            ></TaskList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
