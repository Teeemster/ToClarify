// Project Detail Component
import React from "react";
import { useParams, Link } from "react-router-dom";

import TaskList from "../TaskList";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../../utils/queries";
import { QUERY_ME } from "../../utils/queries";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

const ProjectDetail = () => {
  const { projectId } = useParams();

  const { loading: projectLoading, data: projectData } = useQuery(
    QUERY_PROJECT,
    {
      variables: { id: projectId },
    }
  );
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);

  const project = projectData?.project || {};
  const me = userData?.me || {};

  if (projectLoading || userLoading) {
    return (
      <div className="m-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  // After project data finishes loading, check if current user is a project owner
  let adminPermissions = project.owners.some((owner) => owner._id === me._id);

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
        {adminPermissions && (
          <div className="float-end">
            <Link to={`/project/${projectId}/settings`}>
              <button className="btn btn-purple text-white fw-bold">
                Project Settings
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="Requested"
              projectId={projectId}
              adminPermissions={true}
            ></TaskList>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="In Progress"
              projectId={projectId}
              adminPermissions={adminPermissions}
            ></TaskList>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TaskList
              tasks={project.tasks}
              status="Complete"
              projectId={projectId}
              adminPermissions={adminPermissions}
            ></TaskList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
