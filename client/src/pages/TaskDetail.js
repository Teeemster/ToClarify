//Task detail
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_TASK } from "../utils/queries";
import CommentList from "../components/CommentList";
import TimeLog from "../components/TimeLog";

// TODO add project title and button
// TODO create dropdown for changing task status
// TODO create textarea to edit task description
// TODO have span style change for task.status

const TaskDetail = () => {
  const { id: taskId } = useParams();

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div>
          <h2>{task.title}</h2>
          <p>
            <b>Status:</b> <span>{task.status}</span>
          </p>
          <p>
            <b>Hours:</b> {task.totalHours} / {task.estimatedHours}
          </p>
        </div>
        <div>
          <p>
            <b>Description</b> <Link to={`/${taskId}/edit`}>edit</Link>
          </p>
          <p>{task.description}</p>
        </div>
        <CommentList />
      </div>
      <div>
        <button>Back To Project</button>
        <TimeLog />
      </div>
    </div>
  );
};

export default TaskDetail;
