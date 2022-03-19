// Project Settings Component
import React from "react";
import { useParams, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../../utils/queries";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import AddClientForm from "../AddClientForm";

const ProjectSettings = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId },
  });

  const project = data?.project || {};

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
            <Link to="/" className="d-inline d-md-none link-white">
              <Icon path={mdiMenu} size={1.5} />
            </Link>{" "}
            <Link to={`/project/${project._id}`} className="link-white">
              {project.title}
            </Link>
            {" > "}
            Settings
          </h2>
        </div>
        <div className="float-end">
          <Link to={`/project/${projectId}`}>
            <button className="btn btn-purple text-white fw-bold d-none d-md-inline-block">
              {"< "}Back to Project
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="mx-2">
            <h3 className="fs-4 fw-bold">Admins</h3>
            <p>Admins have full access to this project.</p>
            <ul>
              {project.owners.map((owner) => (
                <li className="fw-bold">
                  {owner.firstName} {owner.lastName} ({owner.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="mx-2">
            <h3 className="fs-4 fw-bold">Clients</h3>
            <p>Clients can view this project and can add "Requested" tasks.</p>
            {!project.clients.length ? (
              <p className="fst-italic">
                There are no clients on this project, yet.
              </p>
            ) : (
              <ul>
                {project.clients.map((client) => (
                  <li className="fw-bold">
                    {client.firstName} {client.lastName} ({client.email})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="mx-2">
            <h3 className="fs-4 fw-bold">Add a client to this project:</h3>
            <AddClientForm projectId={project._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
