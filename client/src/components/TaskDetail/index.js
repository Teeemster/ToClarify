// Task Detail Page
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_TASK } from "../../utils/queries";
import { UPDATE_TASK } from "../../utils/mutations";
import CommentFeed from "../CommentFeed";
import TimeLog from "../TimeLog";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { formatHours } from "../../utils/helpers";

// TODO double check InputTask variables requirements when updating task on both handle submit functions

const TaskDetail = () => {
  // get task id
  const { taskId } = useParams();

  // query task by id
  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {};

  if (loading) {
    return (
      <div className="m-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  let color = "white";
  let statusName = "Complete";
  if (task.status === "REQUESTED") {
    color = "orange";
    statusName = "Requested";
  } else if (task.status === "INPROGRESS") {
    color = "green";
    statusName = "In Progress";
  }

  return (
    <div className="m-4">
      <div className="mb-4">
        <h2 className="fw-bold">
          <Link to="/" className="d-inline d-md-none link-white">
            <Icon path={mdiMenu} size={1.5} />
          </Link>{" "}
          <Link to={`/project/${task.project._id}`} className="link-white">
            {task.project.title}
          </Link>
          {" > "}
          {task.title}
        </h2>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="mx-2">
            <div className="row">
              <div className="col-12 col-sm-5">
                <p className="fw-bold fs-5">
                  Status: <span className={`text-${color}`}>{statusName}</span>
                </p>
              </div>
              <div className="col-12 col-sm-7">
                <p className="mt-1">
                  <span className="fw-bold">Hours:</span>{" "}
                  {formatHours(task.totalHours)} logged /{" "}
                  {formatHours(task.estimatedHours)} complete
                </p>
              </div>
            </div>
            <div className="mt-3">
              <h4 className="fw-bold">Description</h4>
              <p>{task.description}</p>
            </div>
            <div className="mt-5">
              <div>
                <h4 className="fw-bold">Comments</h4>
                <CommentFeed comments={task.comments} taskId={task._id} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2">
            <TimeLog
              timeLog={task.timeLog}
              totalHours={task.totalHours}
              taskId={task._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
